import { ReturnExpr } from ".";

export const createCountExpr = (config?: any) => new CountExpr().config(config);

export class CountExpr extends ReturnExpr {
  key: string = "*";

  run() {
    if (!this.hasValidResults(this.queryResult)) {
      return this.queryResult;
    }
    const rows = this.filterResult[this.key];
    return rows.length;
  }
}
