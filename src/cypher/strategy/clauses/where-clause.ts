import { ClauseType, WhereFilterType } from "../enum";
import { IQueryClause } from "./query-clause";

export interface IWhereClause extends IQueryClause {}

export class WhereClause implements IQueryClause {
  subtype: WhereFilterType = WhereFilterType.must;

  get type(): ClauseType {
    return ClauseType.where;
  }

  isOptional() {
    return this.subtype === WhereFilterType.optional;
  }
}
