import {
  IAliasFilterExpr,
  IFilterExpr,
  IQueryClause,
  IQueryClauses,
  QueryClauses,
} from "..";
import { StrategyHandler } from "../strategy-handler";

export interface IBaseController {
  clauses: IQueryClauses;
  setAliasFilter(filter: IAliasFilterExpr): IBaseController;
  addExpression(...expressions: IFilterExpr[]): IBaseController;
}

export class BaseController extends StrategyHandler implements IBaseController {
  clauses: IQueryClauses = new QueryClauses(this.strategy);

  addClause(clause: IQueryClause) {
    this.clauses.addClause(clause);
  }

  addExpression(...expressions: IFilterExpr[]) {
    this.clauses.addExpression(...expressions);
    return this;
  }

  addFilter(filter: IFilterExpr) {
    this.clauses.current.addExpression(filter);
    return this;
  }

  setAliasFilter(filter: IAliasFilterExpr) {
    this.clauses.current.setAliasFilter(filter);
    return this;
  }
}
