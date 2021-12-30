import { IQueryResult, IResultExpr } from "../../cypher-types";

export const emptyResults = (): IQueryResult => ({
  headers: [],
  data: [],
  get columns() {
    return this.headers.length;
  },
  get rows() {
    return this.data.length;
  },
});

export class ResultExpr implements IResultExpr {
  results: IQueryResult = emptyResults();

  constructor() {}

  setResults(results: IQueryResult) {
    this.results = results;
    return this;
  }

  hasValidResults(results: IQueryResult) {
    return !(results && results.data.length);
  }

  run() {
    throw new Error("ResultExpr sublcass must implement run() method");
  }
}
