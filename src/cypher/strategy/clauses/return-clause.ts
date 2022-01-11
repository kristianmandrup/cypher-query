import { QueryClause } from ".";
import { ClauseType } from "../enum";
import { IQueryClause } from "./query-clause";

export interface IReturnClause extends IQueryClause {}

export class ReturnClause extends QueryClause {
  get type(): ClauseType {
    return ClauseType.where;
  }
}
