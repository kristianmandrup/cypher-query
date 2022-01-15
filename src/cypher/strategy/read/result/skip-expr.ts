import { ReturnExpr } from "../return/return-expr";

export const createSkipExpr = (config: any) => new SkipExpr().config(config);

export class SkipExpr extends ReturnExpr {
  run() {
    if (!this.hasValidResults(this.queryResult)) {
      return this.queryResult;
    }
    this.num && this.queryResult.data.splice(this.num);
    return this.queryResult;
  }
}
