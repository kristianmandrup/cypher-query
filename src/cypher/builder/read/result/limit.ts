import { createLimitExpr } from "../../../strategy/result";
import { ResultClause } from "./result-clause";

export class Limit extends ResultClause {
  number(num: number) {
    if (!this.result) {
      this.error("Missing results to limit");
      return;
    }
    this.result.addExpr(createLimitExpr(num));
    return this;
  }
}
