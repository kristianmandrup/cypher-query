import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropLtExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropLtExpr(api).config(configObj);

export class NodePropLtExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return nodeVal < compareVal;
  }
}
