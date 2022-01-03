import { IFilterResult } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export class NotFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
