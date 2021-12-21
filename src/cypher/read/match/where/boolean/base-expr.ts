import { AndExpr, NotExpr, OrExpr } from ".";
import { Where } from "../where";

type ExprFn = () => boolean;

type ExprObj = {
  matches: () => boolean;
};

export type Expression = ExprFn | ExprObj;

export class BaseExpr {
  whereExpr: Where;

  expressions: Expression[] = [];

  eval(expr: Expression) {
    const exprObj = expr as ExprObj;
    return (exprObj.matches && exprObj.matches()) || (expr as ExprFn)();
  }

  constructor(whereExpr: Where) {
    this.whereExpr = whereExpr;
  }

  get or() {
    return new OrExpr(this.whereExpr);
  }

  get and() {
    return new AndExpr(this.whereExpr);
  }
}
