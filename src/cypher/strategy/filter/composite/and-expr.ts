import { IFilterResult, IStrategyFilter, NodeCompareConfigObj } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createAndFilterExpr = (filter: IStrategyFilter) =>
  new AndFilterExpr(filter);

export class AndFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
