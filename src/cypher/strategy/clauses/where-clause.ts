import { ClauseType, WhereFilterType } from "../enum";
import { IQueryClause, QueryClause } from "./query-clause";

export interface IWhereClause extends IQueryClause {}

export class WhereClause extends QueryClause implements IQueryClause {
  subtype: WhereFilterType = WhereFilterType.must;

  get type(): ClauseType {
    return ClauseType.where;
  }

  isOptional() {
    return this.subtype === WhereFilterType.optional;
  }
}
