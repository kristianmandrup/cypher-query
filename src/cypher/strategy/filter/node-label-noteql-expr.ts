import { IGraphApi } from "../../..";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelNotEqlExpr =
  (api: IGraphApi) => (configObj: NodeLabelConfigObj) =>
    new NodeLabelNotEqlExpr(api).config(configObj);

export class NodeLabelNotEqlExpr extends NodeLabelCompareExpr {
  compareLabel(nodeLabels: string[], compareLabel: string): boolean {
    return !nodeLabels.includes(compareLabel);
  }
}
