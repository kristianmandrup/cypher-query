import { IFilterResult } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export class OrFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
