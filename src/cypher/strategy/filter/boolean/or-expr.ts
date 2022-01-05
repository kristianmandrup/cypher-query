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
  createReduceComposed(objs: GraphObjDef[]): any {
    return (acc: OrCompositeFilterResult, filter: IFilterExpr) => {
      let results = filter.runAll(objs);
      results = acc.setOps.union(acc.combinedResults, results);
      acc.combinedResults = results;
      return acc;
    };
  }

  createCompositeResult() {
    return new OrCompositeFilterResult();
  }
}
