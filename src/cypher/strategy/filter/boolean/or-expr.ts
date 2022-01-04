import { CompositeFilterResult, IFilterExpr } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createOrFilterExpr = (filter: IAliasedFilter, config?: any) =>
  new OrFilterExpr(filter).config(config);

export class OrCompositeFilterResult extends CompositeFilterResult {
  allValid(): boolean {
    return this.results.every((result) => result.length > 0);
  }
}

export class OrFilterExpr extends CompositeFilterExpr {
  reduceComposed(acc: OrCompositeFilterResult, filter: IFilterExpr) {
    let results = filter.run();
    results = acc.setOps.union(acc.latestResults, results);
    acc.latestResults = results;
    return acc;
  }

  createCompositeResult() {
    return new OrCompositeFilterResult();
  }
}
