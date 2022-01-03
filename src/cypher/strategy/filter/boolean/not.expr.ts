import { FilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createNotFilterExpr = (filter: IStrategyFilter) =>
  new NotFilterExpr(filter);

export class NotFilterExpr extends FilterExpr {
  run(): GraphObjDef[] {
    return [];
  }
}
