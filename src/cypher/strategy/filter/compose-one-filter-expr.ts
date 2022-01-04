import { FilterExpr, IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";
import { IAliasedFilter } from "./alias-filter";

export class ComposeOneFilterExpr extends FilterExpr implements IFilterExpr {
  composedFilter?: IFilterExpr;

  constructor(public filter: IAliasedFilter) {
    super(filter);
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  setComposedFilter(filterExpr: IFilterExpr) {
    this.composedFilter = filterExpr;
    return this;
  }

  runComposed(): GraphObjDef[] {
    return this.composedFilter ? this.composedFilter.run() : [];
  }

  run(): GraphObjDef[] {
    return this.runComposed();
  }
}
