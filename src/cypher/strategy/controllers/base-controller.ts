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
  currentClause: IQueryClause;
  latestExpr: IFilterExpr;
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IBaseController;
  addExpressions(...expressions: IFilterExpr[]): IBaseController;
  addAsExpression(key: string, config: any): IBaseController;
  map: any;
}

export class BaseController extends StrategyHandler implements IBaseController {
  clauses: IQueryClauses = new QueryClauses(this.strategy);

  get currentClause(): IQueryClause {
    return this.clauses.current;
  }

  get latestExpr(): IFilterExpr {
    return this.currentClause.latestExpr;
  }

  get map() {
    return {};
  }

  addClause(clause: IQueryClause) {
    this.clauses.addClause(clause);
  }

  addAsExpression(key: string, config: any): IBaseController {
    this.currentClause.addAsExpression(key, config);
    return this;
  }

  addExpressions(...expressions: IFilterExpr[]) {
    this.clauses.addExpressions(...expressions);
    return this;
  }

  setAliasFilterExpr(filter: IAliasFilterExpr) {
    this.clauses.current.setAliasFilterExpr(filter);
    return this;
  }
}
