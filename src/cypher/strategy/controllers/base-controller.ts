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
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IBaseController;
  addExpressions(...expressions: IFilterExpr[]): IBaseController;
}

export class BaseController extends StrategyHandler implements IBaseController {
  clauses: IQueryClauses = new QueryClauses(this.strategy);

  addClause(clause: IQueryClause) {
    this.clauses.addClause(clause);
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
