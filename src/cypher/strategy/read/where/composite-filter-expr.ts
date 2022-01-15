import { FilterExpr, IFilterExpr } from "../..";
import { GraphObjDef } from "../../../cypher-types";
import { ISetOperations, setOperations } from "./boolean/set-operations";

export interface ICompositeFilterResult {
  results: GraphObjDef[][];
  addResult(objs: GraphObjDef[]): ICompositeFilterResult;
  composedResult(): GraphObjDef[];
}

export class CompositeFilterResult {
  combinedResults: GraphObjDef[] = [];
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

export interface ICompositeFilterExpr extends IFilterExpr {
  addFilter(filterExpr: IFilterExpr): ICompositeFilterExpr;
}

export class CompositeFilterExpr
  extends FilterExpr
  implements ICompositeFilterExpr
{
  composedFilters: IFilterExpr[] = [];
  setOps: ISetOperations = setOperations;

  config(config: any = {}) {
    this.config = config;
    return this;
  }

  addFilter(filterExpr: IFilterExpr) {
    this.composedFilters.push(filterExpr);
    return this;
  }

  createReduceComposed(objs: GraphObjDef[]) {
    return (
      acc: ICompositeFilterResult,
      filter: IFilterExpr
    ): ICompositeFilterResult => {
      const results = filter.runAll(objs);
      acc.addResult(results);
      return acc;
    };
  }

  createCompositeResult() {
    return new CompositeFilterResult();
  }

  get filtersToReduce() {
    return this.composedFilters;
  }

  runComposed(objs: GraphObjDef[]): GraphObjDef[] {
    if (!this.composedFilters || this.composedFilters.length === 0) {
      return [];
    }
    const reduceFn = this.createReduceComposed(objs);
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

  runAll(objs: GraphObjDef[]): GraphObjDef[] {
    return this.runComposed(objs);
  }
}
