import { ClauseType } from "../enum";
import { IQueryClause } from "./query-clause";

export class WhereClause implements IQueryClause {
  get type(): ClauseType {
    return ClauseType.where;
  }
}
