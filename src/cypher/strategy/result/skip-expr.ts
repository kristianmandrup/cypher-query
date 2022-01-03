import { IStrategyResult } from "../../cypher-types";
import { ResultExpr } from "./result-expr";

export const createSkipExpr = (result: IStrategyResult, config: any) =>
  new SkipExpr(result).config(config);

export class SkipExpr extends ResultExpr {
  run() {
    if (!this.hasValidResults(this.results)) {
      return this.results;
    }
    this.num && this.results.data.splice(this.num);
    return this.results;
  }
}
