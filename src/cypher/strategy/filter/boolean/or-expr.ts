import {
  CompositeFilterResult,
  ICompositeFilterResult,
  IFilterExpr,
  IFilterResult,
  IStrategyFilter,
} from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createOrFilterExpr = (filter: IAliasedFilter) =>
  new OrFilterExpr(filter);

export class OrCompositeFilterResult extends CompositeFilterResult {
  latestResults: GraphObjDef[] = [];

  allValid(): boolean {
    return this.results.every((result) => result.length > 0);
  }

  composedResult(): GraphObjDef[] {
    return this.latestResults;
  }
}

export class OrFilterExpr extends CompositeFilterExpr {
  createCompositeResult() {
    return new OrCompositeFilterResult();
  }

  reduceComposed(acc: OrCompositeFilterResult, filter: IFilterExpr) {
    const results = filter.run();
    acc.latestResults = results;
    // abort early
    if (!results || results.length === 0) {
      throw "No results";
    }
    return acc;
  }
}
