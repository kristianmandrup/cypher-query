import { NodeCompareConfigObj } from ".";
import { IAliasedFilter } from "..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropEqlExpr = (configObj: NodeCompareConfigObj) =>
  new NodePropEqlExpr().config(configObj);

export class NodePropEqlExpr extends NodePropCompareExpr {
  compareValue(nodeVal: any, compareVal: any): boolean {
    return this.not
      ? !this.compareEqual(nodeVal, compareVal)
      : this.compareEqual(nodeVal, compareVal);
  }

  compareEqual(nodeVal: any, compareVal: any): boolean {
    return nodeVal === compareVal;
  }
}
