import { FilterExpr, IFilterExpr, IFilterResult, IStrategyFilter } from "..";
import { GraphObjDef } from "../../cypher-types";
import { IAliasedFilter } from "./alias-filter";
import { ISetOperations, setOperations } from "./boolean/set-operations";

export interface ICompositeFilterResult {
  results: GraphObjDef[][];
  addResult(objs: GraphObjDef[]): ICompositeFilterResult;
  composedResult(): GraphObjDef[];
}

export abstract class CompositeFilterResult {
  latestResults: GraphObjDef[] = [];
  matchedResults: GraphObjDef[] = [];
  booleanResults: GraphObjDef[] = [];
  results: GraphObjDef[][] = [];
  setOps: ISetOperations = setOperations;

  addResult(objs: GraphObjDef[]) {
    this.results.push(objs);
    return this;
  }

  flatResult(): GraphObjDef[] {
    return this.results.flat();
  }

  composedResult(): GraphObjDef[] {
    return this.flatResult();
  }
}

export class CompositeFilterExpr extends FilterExpr implements IFilterExpr {
  composedFilters: IFilterExpr[] = [];
  setOps: ISetOperations = setOperations;

  constructor(public filter: IAliasedFilter) {
    super(filter);
  }

  config(config: any) {
    this.config = config;
    return this;
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

  get filtersToReduce() {
    return this.composedFilters;
  }

  runComposed(): GraphObjDef[] {
    if (!this.composedFilters || this.composedFilters.length === 0) {
      return [];
    }
    const reduceFn = this.reduceComposed.bind(this);
    try {
      const result = this.filtersToReduce.reduce(
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
