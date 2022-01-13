import { AndExprBuilder, OrExprBuilder } from ".";
import { IWhereClauseBuilder } from "..";
import { ClauseBuilder } from "../../../clause";

type ExprFn = () => boolean;

type ExprObj = {
  matches: () => boolean;
};

export type Expression = ExprFn | ExprObj;

export interface IBaseExprBuilder {
  whereExpr: IWhereClauseBuilder;

  matches(expr: any): any;
}

export class BaseExprBuilder extends ClauseBuilder {
  whereExpr: IWhereClauseBuilder;

  constructor(whereExpr: IWhereClauseBuilder) {
    super(whereExpr.q);
    this.whereExpr = whereExpr;
  }

  matches(expr: any) {
    return this;
  }

  createFilterFrom(config: any) {
    return {} as any;
  }
}
