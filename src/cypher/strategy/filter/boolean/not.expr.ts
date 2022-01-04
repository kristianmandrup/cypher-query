import { CompositeFilterResult, IFilterExpr, IStrategyFilter } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { ComposeOneFilterExpr } from "../compose-one-filter-expr";
import { ISetOperations, setOperations } from "./set-operations";

export const createNotFilterExpr = (filter: IAliasedFilter, config?: any) =>
  new NotFilterExpr(filter).config(config);

export class NotCompositeFilterResult extends CompositeFilterResult {
  composedResult(): GraphObjDef[] {
    return this.latestResults;
  }
}

export class NotFilterExpr extends ComposeOneFilterExpr {
  createCompositeResult() {
    return new NotCompositeFilterResult();
  }

  inverse(results: any[]): GraphObjDef[] {
    return this.setOps.difference(results, this.matchedResults);
  }

  run(): GraphObjDef[] {
    const { composedFilter } = this;
    if (!composedFilter) {
      this.error("Missing composed filter");
      return [];
    }
    const results = this.runComposed();
    return this.inverse(results);
  }
}
