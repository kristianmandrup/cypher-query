import {
  CompositeFilterResult,
  IFilterResult,
  IStrategyFilter,
  NodeCompareConfigObj,
} from "..";
import { GraphObjDef } from "../../../cypher-types";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createAndFilterExpr = (filter: IStrategyFilter) =>
  new AndFilterExpr(filter);

export class AndCompositeFilterResult extends CompositeFilterResult {
  allValid(): boolean {
    return this.results.every((result) => result.length > 0);
  }

  composedResult(): GraphObjDef[] {
    return this.allValid() ? super.composedResult() : [];
  }
}

export class AndFilterExpr extends CompositeFilterExpr {
  createCompositeResult() {
    return new AndCompositeFilterResult();
  }

  run(): GraphObjDef[] {
    const { composedFilters } = this;
    if (!composedFilters || composedFilters.length === 0) {
      this.error("Missing composed filters");
      return [];
    }
    return this.runComposed();
  }
}
