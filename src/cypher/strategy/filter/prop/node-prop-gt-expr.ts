import { NodeCompareConfigObj } from ".";
import { IAliasedFilter } from "..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropGtExpr = (
  filter: IAliasedFilter,
  configObj: NodeCompareConfigObj
) => new NodePropGtExpr(filter).config(configObj);

export class NodePropGtExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return this.equal
      ? this.compareGtEqual(nodeVal, compareVal)
      : this.compareGt(nodeVal, compareVal);
  }

  compareGt(nodeVal: any, compareVal: any): boolean {
    return nodeVal > compareVal;
  }

  compareGtEqual(nodeVal: any, compareVal: any): boolean {
    return nodeVal >= compareVal;
  }
}
