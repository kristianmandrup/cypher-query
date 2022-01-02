import { IGraphApi } from "../../../..";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelMatchesExpr =
  (api: IGraphApi) => (configObj: NodeLabelConfigObj) =>
    new NodeLabelMatchesExpr(api).config(configObj);

export class NodeLabelMatchesExpr extends NodeLabelCompareExpr {
  compareValue(nodeLabels: string[], compareLabel: string | RegExp): boolean {
    return this.not
      ? !this.compareEqual(nodeLabels, compareLabel)
      : this.compareEqual(nodeLabels, compareLabel);
  }

  compareEqual(nodeLabels: string[], compareLabel: string | RegExp): boolean {
    return !!nodeLabels.find((label) => label.match(compareLabel));
  }
}
