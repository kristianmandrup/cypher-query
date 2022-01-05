import { CompositeFilterResult, IFilterExpr } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { CompositeFilterExpr } from "../composite-filter-expr";

export const createAndFilterExpr = (filter: IAliasedFilter, config?: any) =>
  new AndFilterExpr(filter).config(config);

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

  createReduceComposed(objs: GraphObjDef[]): any {
    return (acc: AndCompositeFilterResult, filter: IFilterExpr) => {
      let results = filter.runAll(acc.combinedResults);
      results = acc.setOps.intersection(acc.combinedResults, results);
      acc.combinedResults = results;
      return acc;
    };
  }

  run(obj: any): GraphObjDef | undefined {
    return this.runAll([obj])[0];
  }

  runAll(objs: any): GraphObjDef[] {
    const { composedFilters } = this;
    if (!composedFilters || composedFilters.length === 0) {
      this.error("Missing composed filters");
      return [];
    }
    return this.runComposed(objs);
  }
}
