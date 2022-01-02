import { IGraphApi } from "../../../..";
import {
  NodeLabelCompareExpr,
  NodeLabelConfigObj,
} from "./node-label-compare-expr";

export const createNodeLabelEqlExpr =
  (api: IGraphApi) => (configObj: NodeLabelConfigObj) =>
    new NodeLabelEqlExpr(api).config(configObj);

export class NodeLabelEqlExpr extends NodeLabelCompareExpr {
  compareLabel(nodeLabels: string[], compareLabel: string): boolean {
    return nodeLabels.includes(compareLabel);
  }
}
