import { IGraphObjApi, IStrategyFilter, StrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export interface IAliasFilterExpr {
  graphObjApi?: IGraphObjApi;
  filter?: IStrategyFilter;
  alias: string;
  matchedResults: GraphObjDef[];
  isOptional: boolean;
}

export class AliasFilterExpr implements IAliasFilterExpr {
  filter?: IStrategyFilter;
  alias: string = "_";
  matchedResults: GraphObjDef[] = [];

  setStrategyFilter(filter: IStrategyFilter) {
    this.filter = filter;
    return this;
  }

  get isOptional() {
    return false;
  }

  get graphObjApi(): IGraphObjApi | undefined {
    return this.filter && this.filter.graphObjApi;
  }
}
