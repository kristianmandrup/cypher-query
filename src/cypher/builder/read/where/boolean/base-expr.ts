import { AndExprBuilder, OrExprBuilder } from ".";
import { IWhereBuilder } from "..";
import { BuilderClause } from "../../../clause";

type ExprFn = () => boolean;

type ExprObj = {
  matches: () => boolean;
};

export type Expression = ExprFn | ExprObj;

export class BaseExprBuilder extends BuilderClause {
  whereExpr: IWhereBuilder;

  expressions: Expression[] = [];

  eval(expr: Expression) {
    const exprObj = expr as ExprObj;
    return (exprObj.matches && exprObj.matches()) || (expr as ExprFn)();
  }

  constructor(whereExpr: IWhereBuilder) {
    super(whereExpr.q);
    this.whereExpr = whereExpr;
  }

  get or() {
    return new OrExprBuilder(this.whereExpr);
  }

  get and() {
    return new AndExprBuilder(this.whereExpr);
  }
}
