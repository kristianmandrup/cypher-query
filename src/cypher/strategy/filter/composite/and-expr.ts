import { IFilterResult } from "..";
import { CompositeFilterExpr } from "../composite-filter-expr";

export class AndFilterExpr extends CompositeFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
