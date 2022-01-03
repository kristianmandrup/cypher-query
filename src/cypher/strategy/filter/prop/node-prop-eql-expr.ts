import { NodeCompareConfigObj } from ".";
import { IStrategyFilter } from "..";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export const createNodePropEqlExpr = (
  filter: IStrategyFilter,
  configObj: NodeCompareConfigObj
) => new NodePropEqlExpr(filter).config(configObj);

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
