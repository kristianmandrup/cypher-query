import { IFilterExpr, IFilterResult } from ".";
import { IGraphApi } from "../../..";
import { GraphObjDef } from "../../cypher-types";
import { FilterTree, IFilterTree } from "../tree";

type FilterExpr = (obj: GraphObjDef) => boolean;

export type IGraphObjApi = {
  api?: IGraphApi;
  propValue(obj: any, propName: string): any;
  nodeLabels(obj: any): string[];
};

export interface IStrategyFilter extends IStrategy {
  api?: IGraphApi;
  graphObjApi?: IGraphObjApi;
  // filterAll(objs: GraphObjDef[]): IFilterResult;
  // filter(obj: GraphObjDef): boolean;
}

export const createStrategyFilter = (
  graphObjApi?: IGraphObjApi
): IStrategyFilter => new StrategyFilter(graphObjApi);

export class StrategyFilter implements IStrategyFilter {
  graphObjApi?: IGraphObjApi;
  objs: GraphObjDef[] = [];
  result: IFilterResult = {};
  filterTree: IFilterTree = new FilterTree();

  constructor(graphObjApi?: IGraphObjApi) {
    this.graphObjApi = graphObjApi;
  }

  addFilter(filter: IFilterExpr) {
    this.filterTree.addFilter(filter);
  }

  setObjs(objs: GraphObjDef[]) {
    this.objs = objs;
    return this;
  }

  run() {
    return this;
  }
}
