import { NodeCompareConfigObj } from ".";
import { IAliasedFilter } from "..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropLtExpr = (configObj: NodeCompareConfigObj) =>
  new NodePropLtExpr().config(configObj);

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
