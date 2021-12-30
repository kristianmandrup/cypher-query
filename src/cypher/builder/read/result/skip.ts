import { createSkipExpr } from "../../../strategy/result/skip-expr";
import { ResultClause } from "./result-clause";

export class Skip extends ResultClause {
  number(num: number) {
    if (!this.result) {
      this.error("Missing results to skip");
      return;
    }
    this.result.addExpr(createSkipExpr(num));
    return this;
  }
}
