import { IQueryResult, IStrategyResult } from "../../../cypher-types";
import { createLimitExpr, LimitExpr } from "../../../strategy/result";
import { Clause } from "../../clause";

export class Limit extends Clause {
  result?: IStrategyResult;

  number(num: number) {
    if (!this.result) {
      this.error("Missing results to limit");
      return;
    }
    this.result.addExpr(createLimitExpr(num));
    return this;
  }
}
