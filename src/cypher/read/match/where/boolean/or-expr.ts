import { NotExpr } from ".";
import { BaseExpr } from "./base-expr";

export class OrExpr extends BaseExpr {
  get $not() {
    return new NotExpr(this.whereExpr);
  }

  matches() {
    return this.expressions.some((expr) => this.eval(expr));
  }
}
