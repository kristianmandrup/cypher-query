import { IStrategyResult } from "../../cypher-types";
import { ResultExpr } from "./result-expr";

export const createLimitExpr = (result: IStrategyResult, config?: any) =>
  new LimitExpr(result).config(config);

export class LimitExpr extends ResultExpr {
  run() {
    if (!this.hasValidResults(this.results)) {
      return this.results;
    }
    this.num && this.results.data.splice(0, this.num);
    return this.results;
  }
}
