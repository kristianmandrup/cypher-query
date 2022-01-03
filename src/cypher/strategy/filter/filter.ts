import { IFilterResult } from ".";
import { emptyResults } from "..";
import { IGraphApi } from "../../..";
import { GraphObjDef, IQueryResult } from "../../cypher-types";

type FilterExpr = (obj: GraphObjDef) => boolean;

export type IGraphObjApi = {
  api?: IGraphApi;
  propValue(obj: any, propName: string): any;
  nodeLabels(obj: any): string[];
};

export interface IStrategyFilter extends IStrategy {
  api?: IGraphApi;
  graphObjApi: IGraphObjApi;
  filterAll(objs: GraphObjDef[]): GraphObjDef[];
  filter(obj: GraphObjDef): boolean;
}

export class StrategyFilter implements IStrategy {
  graphObjApi: IGraphObjApi;
  filters: FilterExpr[] = [];
  objs: GraphObjDef[] = [];
  result: IFilterResult = {};

  constructor(graphObjApi: IGraphObjApi) {
    this.graphObjApi = graphObjApi;
  }

  addFilter(filter: FilterExpr) {
    this.filters.push(filter);
  }

  addFilters(filters: FilterExpr[]) {
    this.filters.push(...filters);
    return this;
  }

  // TODO: connect with Match and alias maps
  filterAll(objs: GraphObjDef[]): IFilterResult {
    return {
      _: objs.filter(this.filter.bind(this)),
    };
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
