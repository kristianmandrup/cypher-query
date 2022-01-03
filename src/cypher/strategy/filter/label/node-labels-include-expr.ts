import { IStrategyFilter, NodeCompareConfigObj } from "..";
import { IGraphApi } from "../../../../";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelsIncludeExpr = (
  filter: IStrategyFilter,
  configObj: NodeLabelConfigObj
) => new NodeLabelsIncludeExpr(filter).config(configObj);

export class NodeLabelsIncludeExpr extends NodeLabelCompareExpr {
  compareValue(nodeLabels: string[], compareLabel: string): boolean {
    return this.not
      ? !this.compareEqual(nodeLabels, compareLabel)
      : this.compareEqual(nodeLabels, compareLabel);
  }

  compareEqual(nodeLabels: string[], compareLabel: string): boolean {
    return nodeLabels.includes(compareLabel);
  }
}
