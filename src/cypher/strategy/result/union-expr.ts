import { IQueryResult } from "../../cypher-types";
import { emptyResults, ResultExpr } from "./result-expr";

export const createUnionExpr = (results: IQueryResult) =>
  new UnionExpr().setUnionResults(results);

export class UnionExpr extends ResultExpr {
  results2: IQueryResult = emptyResults();

  setUnionResults(results: IQueryResult) {
    this.results2 = results;
    return this;
  }

  hasSameHeaders(results: IQueryResult, results2: IQueryResult) {
    return results.headers.every((header) => results2.headers.includes(header));
  }

  run() {
    if (!this.hasValidResults(this.results)) {
      this.error("Source results to unite is invalid");
    }
    if (!this.hasValidResults(this.results2)) {
      this.error("Target results to unite is invalid");
    }
    if (!this.hasSameHeaders(this.results, this.results2)) {
      this.error("Results to unite must have same headers");
    }
    this.results.data.push(...this.results2.data);
    return this.results;
  }
}
