import { ResultExpr } from "./result-expr";

export const createLimitExpr = (num?: number) => new LimitExpr().setLimit(num);

export class LimitExpr extends ResultExpr {
  num?: number;

  setLimit(num?: number) {
    this.num = num;
    return this;
  }

  run() {
    if (!this.hasValidResults(this.results)) {
      return this.results;
    }
    this.results.data.splice(0, this.num);
    return this.results;
  }
}