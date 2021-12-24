import { Clause } from "../../clause";

export interface IQueryResult {
  header: string[];
  rows: any[];
  count: number;
}

export class Limit extends Clause {
  results?: IQueryResult;

  number(num: number) {
    if (!this.results) {
      this.error("Missing results to limit");
    }
    this.results && this.results.rows.splice(0, num);
    return this;
  }
}
