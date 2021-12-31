import { FilterExpr, IFilterResult } from "./filter-expr";

export type NodeMatchFn = (obj: NodeLabelConfigObj) => boolean;

export type LabelCompareFn = (
  labels: string[],
  compareLabel: string
) => boolean;

export type NodeLabelConfigObj = {
  node: any;
  label: string;
};

export class NodeLabelCompareExpr extends FilterExpr {
  label: string = "*";

  setLabel(alias: string) {
    this.alias = alias;
    return this;
  }

  config(configObj: NodeLabelConfigObj) {
    super.setNode(configObj.node);
    this.setLabel(configObj.label);
    return this;
  }

  nodeMatches(fn: NodeMatchFn): IFilterResult {
    const { node, label, alias } = this;
    const matches = fn({ node, label });
    return matches ? { [alias]: [node] } : {};
  }

  isValid() {
    return this.label && this.label.trim().length;
  }

  runCompare(compareFn: NodeMatchFn): IFilterResult {
    if (!this.isValid()) {
      return this.results;
    }
    return this.nodeMatches(compareFn);
  }

  compareLabel(label: any, compareLabel: any): boolean {
    return label == compareLabel;
  }

  run(): IFilterResult {
    return this.runCompareValue(this.compareLabel);
  }

  runCompareValue(compareLabelFn?: LabelCompareFn): IFilterResult {
    compareLabelFn = compareLabelFn || this.compareLabel;
    if (!compareLabelFn) {
      this.error("Missing compare label function");
      return {};
    }
    return this.runCompare((obj: NodeLabelConfigObj) =>
      compareLabelFn
        ? compareLabelFn(this.nodeLabels(obj.node), this.label)
        : false
    );
  }
}
