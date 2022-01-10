import { IFilterExpr, IFilterResult } from ".";
import { IGraphApi } from "../../..";
import { GraphObjDef } from "../../cypher-types";
import { IQueryController, QueryController } from "../controllers";

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
  queryController: IQueryController = new QueryController();

  constructor(graphObjApi?: IGraphObjApi) {
    this.graphObjApi = graphObjApi;
  }

  addFilter(filter: IFilterExpr) {
    // this.queryController.addFilter(filter);
    return this;
  }

  // TODO: connect with Match and alias maps
  filter(objs: GraphObjDef[]): IFilterResult {
    return {
      _: [],
    };
  }

  setObjs(objs: GraphObjDef[]) {
    this.objs = objs;
    return this;
  }

  run() {
    return this;
  }
}
