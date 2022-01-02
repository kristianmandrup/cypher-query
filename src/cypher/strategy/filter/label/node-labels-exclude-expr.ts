import { IGraphApi } from "../../../../";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelsExcludeExpr =
  (api: IGraphApi) => (configObj: NodeLabelConfigObj) =>
    new NodeLabelsExcludeExpr(api).config(configObj);

export class NodeLabelsExcludeExpr extends NodeLabelCompareExpr {
  compareLabel(nodeLabels: string[], compareLabel: string): boolean {
    return !nodeLabels.includes(compareLabel);
  }
}
