import { FilterExpr, IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";

export interface ICompositeFilterResult {
  results: GraphObjDef[][];
  addResult(objs: GraphObjDef[]): ICompositeFilterResult;
  composedResult(): GraphObjDef[];
}

export class CompositeFilterResult {
  results: GraphObjDef[][] = [];

  addResult(objs: GraphObjDef[]) {
    this.results.push(objs);
    return this;
  }

  composedResult(): GraphObjDef[] {
    return this.results.flat();
  }
}

export class CompositeFilterExpr extends FilterExpr implements IFilterExpr {
  composedFilters: IFilterExpr[] = [];

  constructor(public filter: IStrategyFilter) {
    super(filter);
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  addFilter(filterExpr: IFilterExpr) {
    this.composedFilters.push(filterExpr);
    return this;
  }

  reduceComposed(acc: ICompositeFilterResult, filter: IFilterExpr) {
    const results = filter.run();
    acc.addResult(results);
    return acc;
  }

  createCompositeResult() {
    return new CompositeFilterResult();
  }

  runComposed(): GraphObjDef[] {
    if (!this.composedFilters || this.composedFilters.length === 0) {
      return [];
    }
    const reduceFn = this.reduceComposed.bind(this);
    try {
      const result = this.composedFilters.reduce(
        reduceFn,
        this.createCompositeResult()
      );
      return result.composedResult();
    } catch (err) {
      return [];
    }
  }

  run(): GraphObjDef[] {
    return [];
  }
}
