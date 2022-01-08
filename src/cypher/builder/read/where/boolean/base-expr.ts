import { AndExprBuilder, OrExprBuilder } from ".";
import { IWhereBuilder } from "..";
import { BuilderClause } from "../../../clause";

type ExprFn = () => boolean;

type ExprObj = {
  matches: () => boolean;
};

export type Expression = ExprFn | ExprObj;

export interface IBaseExprBuilder {
  whereExpr: IWhereBuilder;

  matches(expr: any): any;
}

export class BaseExprBuilder extends BuilderClause {
  whereExpr: IWhereBuilder;

  constructor(whereExpr: IWhereBuilder) {
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
