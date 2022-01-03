import { IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export class CompositeFilterExpr implements IFilterExpr {
  filter: IStrategyFilter;
  results: IFilterResult = {};

  constructor(filter: IStrategyFilter) {
    this.filter = filter;
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  run(): GraphObjDef[] {
    return [];
  }
}
