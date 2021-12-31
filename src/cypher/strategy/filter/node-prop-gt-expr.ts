import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropGtExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropGtExpr(api).config(configObj);

export class NodePropGtExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal > compareVal;
  }
}
