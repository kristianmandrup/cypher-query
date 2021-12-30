import { IQueryResult } from "../../cypher-types";
import { emptyResults, ResultExpr } from "./result-expr";

export const createSkipExpr = (results: IQueryResult) =>
  new UnionExpr().setUnionResults(results);

export class UnionExpr extends ResultExpr {
  results2: IQueryResult = emptyResults();

  setUnionResults(results: IQueryResult) {
    this.results2 = results;
    return this;
  }

  run() {
    if (!this.hasValidResults(this.results)) {
      return this.results;
    }
    if (!this.hasValidResults(this.results2)) {
      return this.results2;
    }
    this.results.data.push(...this.results2.data);
    return this.results;
  }
}
