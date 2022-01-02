import { NodeMatchFn } from "..";
import { FilterExpr, IFilterResult } from "../filter-expr";

export type PropValueCompareFn = (nodeVal: any, compareVal: any) => boolean;

export type NodeCompareConfigObj = {
  node: any;
  propName: string;
  propValue: any;
  equal?: boolean;
  not?: boolean;
};

export class NodePropCompareExpr extends FilterExpr {
  propName: string = "*";
  propValue: any;
  equal?: boolean;
  not?: boolean;

  config(configObj: NodeCompareConfigObj) {
    super.setNode(configObj.node);
    this.setPropName(configObj.propName);
    this.setPropValue(configObj.propValue);
    this.setEqual(!!configObj.equal);
    this.setNot(!!configObj.not);
    return this;
  }

  setPropName(propName: string) {
    this.propName = propName;
    return this;
  }

  setPropValue(propValue: string) {
    this.propValue = propValue;
    return this;
  }

  setEqual(equal: boolean) {
    this.equal = equal;
    return this;
  }

  setNot(not: boolean) {
    this.not = not;
    return this;
  }

  nodeMatches(fn: NodeMatchFn): IFilterResult {
    const { node, propName, propValue, alias } = this;
    const matches = fn({ node, propName, propValue });
    return matches ? { [alias]: [node] } : {};
  }

  isValid() {
    return (
      this.propName &&
      this.propName.trim().length &&
      this.isDefined(this.propValue)
    );
  }

  runCompare(compareFn: NodeMatchFn): IFilterResult {
    if (!this.isValid()) {
      return this.results;
    }
    return this.nodeMatches(compareFn);
  }

  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal == compareVal;
  }

  run(): IFilterResult {
    return this.runCompareValue(this.compareValue);
  }

  runCompareValue(compareValueFn?: PropValueCompareFn): IFilterResult {
    compareValueFn = compareValueFn || this.compareValue;
    if (!compareValueFn) {
      this.error("Missing compare value function");
      return {};
    }
    return this.runCompare((obj: NodeCompareConfigObj) =>
      compareValueFn
        ? compareValueFn(this.propValue(obj.node, obj.propName), obj.propValue)
        : false
    );
  }
}