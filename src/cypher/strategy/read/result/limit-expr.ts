import { ReturnExpr } from "../return/return-expr";

export const createLimitExpr = (config?: any) => new LimitExpr().config(config);

export class LimitExpr extends ReturnExpr {
  run() {
    if (!this.hasValidResults(this.queryResult)) {
      return this.queryResult;
    }
    this.num && this.queryResult.data.splice(0, this.num);
    return this.queryResult;
  }
}
