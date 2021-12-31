import { IQueryResult, IResultExpr } from "../../cypher-types";

const createData = (num: number): any[] =>
  [...Array(num)].map((e, i) => ({ id: i }));

const createHeaders = (num: number): string[] =>
  [...Array(num)].map((e, i) => String.fromCharCode(i + 65));

export const createResults = (num: number): IQueryResult => {
  const results = emptyResults();
  results.headers = createHeaders(num);
  results.data = createData(num);
  return results;
};

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
