import { QueryClause } from ".";
import { ClauseType } from "../enum";
import { IQueryClause } from "./query-clause";

export interface IMatchClause extends IQueryClause {}

export class MatchClause extends QueryClause {
  get type(): ClauseType {
    return ClauseType.where;
  }
}
