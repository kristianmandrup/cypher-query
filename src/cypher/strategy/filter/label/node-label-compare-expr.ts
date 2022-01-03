import { GraphObjDef } from "../../../cypher-types";
import { FilterExpr, IFilterResult } from "../filter-expr";

export type NodeLabelMatchFn = (obj: NodeLabelConfigObj) => boolean;

export type LabelCompareFn = (
  labels: string[],
  compareLabel: string
) => boolean;

export type NodeLabelConfigObj = {
  node: any;
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
    super.setNode(configObj.node);
    this.setLabel(configObj.label);
    this.setNot(!!configObj.not);
    return this;
  }

  nodeMatches(fn: NodeLabelMatchFn): GraphObjDef[] {
    const { node, label } = this;
    const matches = fn({ node, label });
    return matches ? [node] : [];
  }

  isValid() {
    return this.label && this.label.trim().length;
  }

  runCompare(compareFn: NodeLabelMatchFn): GraphObjDef[] {
    if (!this.isValid()) {
      return this.results;
    }
    return this.nodeMatches(compareFn);
  }

  compareLabel(label: any, compareLabel: any): boolean {
    return label == compareLabel;
  }

  run(): GraphObjDef[] {
    return this.runCompareValue(this.compareLabel);
  }

  runCompareValue(compareLabelFn?: LabelCompareFn): GraphObjDef[] {
    compareLabelFn = compareLabelFn || this.compareLabel;
    if (!compareLabelFn) {
      this.error("Missing compare label function");
      return [];
    }
    return this.runCompare((obj: NodeLabelConfigObj) =>
      compareLabelFn
        ? compareLabelFn(this.nodeLabels(obj.node), this.label)
        : false
    );
  }
}
