import { emptyResults, ResultExpr } from ".";
import { GraphObjDef, IQueryResult } from "../../cypher-types";
import { IFilterResult } from "../filter";
import { FilterResultConverter } from "../filter/filter-result-converter";

export class StrategyResult {
  filtered: IFilterResult = {};
  results: IQueryResult = emptyResults();
  expressions: ResultExpr[] = [];
  converter: FilterResultConverter;

  constructor() {
    this.converter = new FilterResultConverter();
  }

  setFiltered(filtered: IFilterResult) {
    this.filtered = filtered;
    this.results = this.converter.toQueryResult(this.filtered);
    return this;
  }

  addExpr(expr: ResultExpr) {
    expr.setResults(this.results);
    this.expressions.push(expr);
    return this;
  }
}
