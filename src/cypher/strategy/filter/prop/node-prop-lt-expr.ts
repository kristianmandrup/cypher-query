import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../../..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropLtExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropLtExpr(api).config(configObj);

export class NodePropLtExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return this.equal
      ? this.compareLtEqual(nodeVal, compareVal)
      : this.compareLt(nodeVal, compareVal);
  }

  compareLt(nodeVal: any, compareVal: any): boolean {
    return nodeVal < compareVal;
  }

  compareLtEqual(nodeVal: any, compareVal: any): boolean {
    return nodeVal <= compareVal;
  }
}
