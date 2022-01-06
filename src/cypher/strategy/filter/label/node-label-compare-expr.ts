import { GraphObjDef } from "../../../cypher-types";
import { FilterExpr } from "../filter-expr";

export type NodeLabelMatchFn = (
  obj: any,
  config: NodeLabelConfigObj
) => boolean;

export type LabelCompareFn = (
  labels: string[],
  compareLabel: string
) => boolean;

export type NodeLabelConfigObj = {
  label: string;
  not?: boolean;
};

export class NodeLabelCompareExpr extends FilterExpr {
  label: string = "*";
  not?: boolean;

  setLabel(alias: string) {
    this.alias = alias;
    return this;
  }

  setNot(not: boolean) {
    this.not = not;
    return this;
  }

  config(configObj: NodeLabelConfigObj) {
    this.setLabel(configObj.label);
    this.setNot(!!configObj.not);
    return this;
  }

  nodeMatches(obj: any, fn: NodeLabelMatchFn): GraphObjDef | undefined {
    const { node, label } = this;
    const matches = fn(obj, { label });
    return matches ? node : undefined;
  }

  isValid() {
    return this.label && this.label.trim().length;
  }

  runCompare(compareFn: NodeLabelMatchFn, obj: any): GraphObjDef | undefined {
    if (!this.isValid()) {
      return undefined;
    }
    return this.nodeMatches(obj, compareFn);
  }

  compareLabel(label: any, compareLabel: any): boolean {
    return label == compareLabel;
  }

  run(obj: any): GraphObjDef | undefined {
    return this.runCompareValue(obj, this.compareLabel);
  }

  runCompareValue(
    obj: any,
    compareLabelFn?: LabelCompareFn
  ): GraphObjDef | undefined {
    compareLabelFn = compareLabelFn || this.compareLabel;
    if (!compareLabelFn) {
      this.error("Missing compare label function");
      return;
    }
    const compare = (config: NodeLabelConfigObj) =>
      compareLabelFn ? compareLabelFn(this.nodeLabels(obj), this.label) : false;
    return this.runCompare(compare, obj);
  }
}
