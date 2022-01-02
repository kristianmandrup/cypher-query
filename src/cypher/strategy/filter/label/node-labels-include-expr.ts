import { IGraphApi } from "../../../../";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelsIncludeExpr =
  (api: IGraphApi) => (configObj: NodeLabelConfigObj) =>
    new NodeLabelsIncludeExpr(api).config(configObj);

export class NodeLabelsIncludeExpr extends NodeLabelCompareExpr {
  compareLabel(nodeLabels: string[], compareLabel: string): boolean {
    return nodeLabels.includes(compareLabel);
  }
}
