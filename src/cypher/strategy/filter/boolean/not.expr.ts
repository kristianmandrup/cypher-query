import { IStrategyFilter } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { IAliasedFilter } from "../alias-filter";
import { ComposeOneFilterExpr } from "../compose-one-filter-expr";

export const createNotFilterExpr = (filter: IAliasedFilter) =>
  new NotFilterExpr(filter);

export class NotFilterExpr extends ComposeOneFilterExpr {
  run(): GraphObjDef[] {
    const { composedFilter } = this;
    if (!composedFilter) {
      this.error("Missing composed filter");
      return [];
    }
    this.runComposed();
    return composedFilter.isTrue() ? [] : composedFilter.results;
  }
}
