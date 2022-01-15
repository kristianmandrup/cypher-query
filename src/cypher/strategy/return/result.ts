import { emptyResults, IReturnExpr, ReturnExpr } from ".";
import { IQueryResult } from "../../cypher-types";
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

export interface IStrategyResult {
  setFiltered(filtered: IFilterResult): IStrategyResult;
  addExpr(expr: IReturnExpr): IStrategyResult;
}

export class StrategyResult {
  filtered: IFilterResult = {};
  results: IQueryResult = emptyResults();
  expressions: IReturnExpr[] = [];
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

  addExpr(expr: IReturnExpr) {
    expr.setResults(this.results);
    this.expressions.push(expr);
    return this;
  }
}
