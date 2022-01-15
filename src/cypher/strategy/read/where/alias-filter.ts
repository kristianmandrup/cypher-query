import { FilterExpr, IFilterExpr } from ".";
import { ICypherStrategy } from "../..";
import { IGraphObjApi } from "../../../..";
import { GraphObjDef } from "../../../cypher-types";

export interface IAliasFilterExpr extends IFilterExpr {
  strategy?: ICypherStrategy;
  alias: string;
  matchedResults: GraphObjDef[];
  setMatchedResults(matchedResults: GraphObjDef[]): IAliasFilterExpr;
}

export class AliasFilterExpr extends FilterExpr implements IAliasFilterExpr {
  alias: string = "_";
  matchedResults: GraphObjDef[] = [];

  setMatchedResults(matchedResults: GraphObjDef[]) {
    this.matchedResults = matchedResults;
    return this;
  }

  get isOptional() {
    return false;
  }
}
