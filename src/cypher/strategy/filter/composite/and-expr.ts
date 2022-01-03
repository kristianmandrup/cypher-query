import { IFilterResult, IStrategyFilter, NodeCompareConfigObj } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createAndFilterExpr = (filter: IStrategyFilter) =>
  new AndFilterExpr(filter);

export class AndFilterExpr extends CompositeFilterExpr {
  run(): GraphObjDef[] {
    return [];
  }
}
