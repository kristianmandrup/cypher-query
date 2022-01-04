import { IGraphObjApi, IStrategyFilter, StrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export interface IAliasedFilter {
  graphObjApi: IGraphObjApi;
  filter: IStrategyFilter;
  alias: string;
  matchedResults: GraphObjDef[];
}

export class AliasedFilter implements IAliasedFilter {
  filter: IStrategyFilter;
  alias: string = "_";
  matchedResults: GraphObjDef[] = [];

  constructor(filter: IStrategyFilter) {
    this.filter = filter;
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }
}
