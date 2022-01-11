import { ClauseType, WhereFilterType } from "../enum";
import { ClauseExpressions } from "../expressions/clause-expressions";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
}

export class QueryClause implements IQueryClause {
  expressions: ClauseExpressions = new ClauseExpressions();

  subtype: WhereFilterType = WhereFilterType.none;

  error(msg: string) {
    throw new Error(msg);
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
