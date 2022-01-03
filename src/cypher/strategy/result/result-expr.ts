import { Handler } from "../../builder/handler";
import { IQueryResult, IResultExpr, IStrategyResult } from "../../cypher-types";

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

type NodeResultConfigObj = {
  num?: number;
};

export class ResultExpr extends Handler implements IResultExpr {
  results: IQueryResult = emptyResults();
  result: IStrategyResult;
  num?: number;

  constructor(result: IStrategyResult) {
    super();
    this.result = result;
  }

  config(configObj: NodeResultConfigObj = {}) {
    this.setNumber(configObj.num);
    return this;
  }

  setNumber(num?: number) {
    this.num = num;
    return this;
  }

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
