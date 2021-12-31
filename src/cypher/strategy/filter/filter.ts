import { GraphObjDef } from "../../cypher-types";

type FilterExpr = (obj: GraphObjDef) => boolean;

export interface IStrategyFilter extends IStrategy {
  filterAll(objs: GraphObjDef[]): GraphObjDef[];
  filter(obj: GraphObjDef): boolean;
}

export class StrategyFilter implements IStrategy {
  filters: FilterExpr[] = [];
  objs: GraphObjDef[] = [];
  result: GraphObjDef[] = [];

  constructor(filters: FilterExpr[]) {
    this.filters = filters;
  }

  addFilter(filter: FilterExpr) {
    this.filters.push(filter);
  }

  addFilters(filters: FilterExpr[]) {
    this.filters.push(...filters);
  }

  filterAll(objs: GraphObjDef[]) {
    return objs.filter(this.filter.bind(this));
  }

  filter(obj: GraphObjDef) {
    return this.filters.every((filter: FilterExpr) => filter(obj));
  }

  setObjs(objs: GraphObjDef[]) {
    this.objs = objs;
    return this;
  }

  run() {
    this.result = this.filterAll(this.objs);
    return this;
  }
}
