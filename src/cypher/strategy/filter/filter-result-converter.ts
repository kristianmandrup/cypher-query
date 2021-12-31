import { IFilterResult } from ".";
import { emptyResults } from "..";
import { IQueryResult } from "../../cypher-types";

export class FilterResultConverter {
  result: IFilterResult = {};

  constructor() {}

  filterKeyResultToQueryResult(acc: IQueryResult, key: string) {
    const keyResults = this.result[key];
    // insert each keyResult at specific index in data
    keyResults.map((keyResult, i) => {
      acc.data[i] = acc.data[i] || [];
      acc.data[i].splice(i, 0, keyResult);
    });
    acc.headers.push(key);
    return acc;
  }

  toQueryResult(filtered: IFilterResult): IQueryResult {
    const keys = Object.keys(filtered);
    return keys.reduce(
      this.filterKeyResultToQueryResult.bind(this),
      emptyResults()
    );
  }
}
