import { QueryClause } from ".";
import { ClauseType } from "../enum";
import { IQueryClause } from "./query-clause";

export interface IResultClause extends IQueryClause {}

export class ResultClause extends QueryClause {
  get type(): ClauseType {
    return ClauseType.where;
  }
}
