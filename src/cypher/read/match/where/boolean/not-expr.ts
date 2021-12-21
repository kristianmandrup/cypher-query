import { BaseExpr } from "./base-expr";

export class NotExpr extends BaseExpr {
  matches() {
    return this.expressions.every((expr) => !this.eval(expr));
  }
}
