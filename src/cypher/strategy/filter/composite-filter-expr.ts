import { IFilterExpr, IFilterResult } from "..";

export class CompositeFilterExpr implements IFilterExpr {
  run(): IFilterResult {
    return {};
  }
}
