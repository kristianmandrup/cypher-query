import { NotExpr } from ".";
import { BaseExpr } from "./base-expr";

export class AndExpr extends BaseExpr {
  get not() {
    return new NotExpr(this.whereExpr);
  }

  matches() {
    return this.expressions.every((expr) => this.eval(expr));
  }
}
