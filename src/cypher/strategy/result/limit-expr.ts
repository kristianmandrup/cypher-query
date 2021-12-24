import { IQueryResult, IResultExpr } from "../../cypher-types";

export class ResultExpr implements IResultExpr {
  results: IQueryResult = {
    header: [],
    rows: [],
    count: 0,
  };

  constructor() {}

  setResults(results: IQueryResult) {
    this.results = results;
    return this;
  }
}

export const createLimitExpr = (num?: number) => new LimitExpr().setLimit(num);

export class LimitExpr extends ResultExpr {
  num?: number;

  setLimit(num?: number) {
    this.num = num;
    return this;
  }

  limit() {
    if (!(this.results && this.num && this.results.rows.length)) this.results;
    this.results.rows.splice(0, this.num);
    return this.results;
  }
}
