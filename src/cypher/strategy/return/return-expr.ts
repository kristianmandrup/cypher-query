import { IStrategyResult } from ".";
import { IFilterResult } from "..";
import { Handler } from "../../builder/handler";
import { IQueryResult } from "../../cypher-types";

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

export interface IReturnExpr {
  filterResult: IFilterResult;
  queryResult: IQueryResult;
  result?: IStrategyResult;
  setResult(result: IStrategyResult): IReturnExpr;
  setResults(queryResult: IQueryResult): IReturnExpr;
  run(): any;
}

export class ReturnExpr extends Handler implements IReturnExpr {
  filterResult: IFilterResult = {};
  queryResult: IQueryResult = emptyResults();
  result?: IStrategyResult;
  num?: number;

  constructor() {
    super();
  }

  setResult(result: IStrategyResult) {
    this.result = result;
    return this;
  }

  config(configObj: NodeResultConfigObj = {}) {
    this.setNumber(configObj.num);
    return this;
  }

  setNumber(num?: number) {
    this.num = num;
    return this;
  }

  setResults(queryResult: IQueryResult) {
    this.queryResult = queryResult;
    return this;
  }

  hasValidResults(results: IQueryResult) {
    return !(results && results.data.length);
  }

  run() {
    throw new Error("ResultExpr sublcass must implement run() method");
  }
}
