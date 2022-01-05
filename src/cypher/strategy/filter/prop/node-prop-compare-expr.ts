import { NodeMatchFn } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { FilterExpr } from "../filter-expr";

export type PropValueCompareFn = (nodeVal: any, compareVal: any) => boolean;

export type NodeCompareConfigObj = {
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

  nodeMatches(obj: any, fn: NodeMatchFn): GraphObjDef | undefined {
    const { propName, propValue } = this;
    const matches = fn(obj, { propName, propValue });
    return matches ? obj : undefined;
  }

  isValid() {
    return (
      this.propName &&
      this.propName.trim().length &&
      this.isDefined(this.propValue)
    );
  }

  runCompare(obj: any, compareFn: NodeMatchFn): GraphObjDef | undefined {
    if (!this.isValid()) {
      return;
    }
    return this.nodeMatches(obj, compareFn);
  }

  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal == compareVal;
  }

  run(obj: any): GraphObjDef | undefined {
    return this.runCompareValue(obj, this.compareValue);
  }

  runCompareValue(
    obj: any,
    compareValueFn?: PropValueCompareFn
  ): GraphObjDef | undefined {
    compareValueFn = compareValueFn || this.compareValue;
    if (!compareValueFn) {
      this.error("Missing compare value function");
      return;
    }
    return this.runCompare(obj, (config: NodeCompareConfigObj) =>
      compareValueFn
        ? compareValueFn(this.propValue(obj, config.propName), config.propValue)
        : false
    );
  }
}
