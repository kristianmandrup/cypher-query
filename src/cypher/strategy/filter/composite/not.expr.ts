import { IFilterResult, IStrategyFilter } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createNotFilterExpr = (filter: IStrategyFilter) =>
  new NotFilterExpr(filter);

export class NotFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
