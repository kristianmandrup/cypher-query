import { Handler } from "../..";
import { ClauseType } from "../enum";
import { IQueryClause } from "./query-clause";

export interface IQueryClauses {
  addClause(clause: IQueryClause): IQueryClauses;
  get current(): IQueryClause;
}

export class QueryClauses extends Handler {
  list: IQueryClause[] = [];

  get current(): IQueryClause {
    return this.list[this.list.length - 1];
  }

  addClause(clause: IQueryClause) {
    if (!this.isValid(clause)) {
      this.error(`addClause: Invalid ${this.typeName} clause`, clause);
      return this;
    }
    this.list.push(clause);
    return this;
  }

  isValid(clause: IQueryClause) {
    return false;
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
