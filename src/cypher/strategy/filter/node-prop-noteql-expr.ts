import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropNotEqlExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropNotEqlExpr(api).config(configObj);

export class NodePropNotEqlExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal == compareVal;
  }
}
