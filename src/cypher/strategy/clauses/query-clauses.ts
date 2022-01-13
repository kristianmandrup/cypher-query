import { IFilterExpr } from "..";
import { ClauseType } from "../enum";
import { StrategyHandler } from "../strategy-handler";
import { IQueryClause } from "./query-clause";

export interface IQueryClauses {
  addClause(clause: IQueryClause): IQueryClauses;
  addExpression(...expressions: IFilterExpr[]): IQueryClauses;
  get current(): IQueryClause;
}

export class QueryClauses extends StrategyHandler {
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

  addExpression(...expressions: IFilterExpr[]) {
    this.current.addExpression(...expressions);
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
