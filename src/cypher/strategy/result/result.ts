import { emptyResults, ResultExpr } from ".";
import { GraphObjDef, IQueryResult, IStrategyResult } from "../../cypher-types";
import { IFilterResult } from "../filter";
import {
  FilterResultConverter,
  IFilterResultConverter,
} from "../filter/filter-result-converter";

export const createStrategyResult = (
  config: IStrategyResultConfig = {}
): IStrategyResult => new StrategyResult(config);

export interface IStrategyResultConfig {
  converter?: IFilterResultConverter;
}

export class StrategyResult {
  filtered: IFilterResult = {};
  results: IQueryResult = emptyResults();
  expressions: ResultExpr[] = [];
  converter: IFilterResultConverter;

  constructor(config: IStrategyResultConfig = {}) {
    this.converter = config.converter || this.createFilterResultConverter();
  }

  createFilterResultConverter() {
    return new FilterResultConverter();
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
