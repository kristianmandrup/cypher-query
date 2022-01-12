import {
  IAliasFilterExpr,
  IFilterExpr,
  IQueryClause,
  IQueryClauses,
  QueryClauses,
} from "..";

export interface IBaseController {
  clauses: IQueryClauses;
  setAliasFilter(filter: IAliasFilterExpr): IBaseController;
}

export class BaseController implements IBaseController {
  clauses: IQueryClauses = new QueryClauses();

  addClause(clause: IQueryClause) {
    this.clauses.addClause(clause);
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
