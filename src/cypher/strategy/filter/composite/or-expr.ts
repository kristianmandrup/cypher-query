import { IFilterResult, IStrategyFilter } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createOrFilterExpr = (filter: IStrategyFilter) =>
  new OrFilterExpr(filter);

export class OrFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
