import { IStrategyResult } from "../../../cypher-types";
import { BuilderClause } from "../../clause";

export interface IReturnClause {
  result?: IStrategyResult;
}

export class ReturnClause extends BuilderClause {
  result?: IStrategyResult;
}
