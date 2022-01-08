import { IGraphObjApi, IStrategyFilter, StrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export interface IAliasedFilter {
  graphObjApi?: IGraphObjApi;
  filter?: IStrategyFilter;
  alias: string;
  matchedResults: GraphObjDef[];
}

export class AliasedFilter implements IAliasedFilter {
  filter?: IStrategyFilter;
  alias: string = "_";
  matchedResults: GraphObjDef[] = [];

  setStrategyFilter(filter: IStrategyFilter) {
    this.filter = filter;
    return this;
  }

  get graphObjApi(): IGraphObjApi | undefined {
    return this.filter && this.filter.graphObjApi;
  }
}
