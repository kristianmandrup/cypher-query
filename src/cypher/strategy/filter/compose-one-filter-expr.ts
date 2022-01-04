import { IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export class ComposeOneFilterExpr implements IFilterExpr {
  filter: IStrategyFilter;
  results: IFilterResult = {};
  composedFilter?: IFilterExpr;

  constructor(filter: IStrategyFilter) {
    this.filter = filter;
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  setComposedFilter(filterExpr: IFilterExpr) {
    this.composedFilter = filterExpr;
    return this;
  }

  run(): GraphObjDef[] {
    return [];
  }
}
