import { ResultExpr } from "./result-expr";

export const createSkipExpr = (num?: number) => new SkipExpr().setSkip(num);

export class SkipExpr extends ResultExpr {
  num: number = 0;

  setSkip(num: number = 0) {
    this.num = num;
    return this;
  }

  run() {
    if (!this.hasValidResults(this.results)) {
      return this.results;
    }
    this.results.data.splice(this.num);
    return this.results;
  }
}
