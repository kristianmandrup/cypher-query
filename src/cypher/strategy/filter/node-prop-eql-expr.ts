import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropEqlExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropEqlExpr(api).config(configObj);

export class NodePropEqlExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal == compareVal;
  }
}
