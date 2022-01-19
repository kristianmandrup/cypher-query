import { Handler } from "..";
import { IFilterExpr, IGraphApi, IGraphObjApi } from "../..";
import { GraphObjDef, IQueryResult } from "../cypher-types";
import {
  IQueryController,
  QueryController,
  IMatchController,
  IWhereController,
  IReturnController,
  IResultController,
} from "./controllers";
import { IBaseController } from "./controllers/base-controller";
import { defaultStrategyMap } from "./defaults";
import { IStrategyMap } from "./map";

export interface ICypherStrategy {
  strategyMap: IStrategyMap;
  graphApi?: IGraphApi;
  graphObjApi?: IGraphObjApi;
  queryController: IQueryController;
  match: IMatchController;
  where: IWhereController;
  return: IReturnController;
  result: IResultController;

  latestExpr?: IFilterExpr;
  addAsExpression(
    clauseName: string,
    key: string,
    config: any
  ): ICypherStrategy;
  setGraphApi(graphApi: IGraphApi): ICypherStrategy;
  configure(config: any): ICypherStrategy;
  run(objs: GraphObjDef[]): IQueryResult;
}

export class CypherStrategy extends Handler implements ICypherStrategy {
  graphApi?: IGraphApi;
  graphObjApi?: IGraphObjApi;
  queryController: IQueryController = new QueryController(this);
  strategyMap: IStrategyMap = defaultStrategyMap();

  get latestExpr() {
    return this.queryController.latestExpr;
  }

  get controllers() {
    return this.queryController.controllers;
  }

  get match() {
    return this.controllers["match"];
  }

  get where() {
    return this.controllers["where"];
  }

  get return() {
    return this.controllers["return"];
  }

  get result() {
    return this.controllers["result"];
  }

  addAsExpression(
    clauseName: string,
    key: string,
    config: any
  ): ICypherStrategy {
    const controller: IBaseController = this.controllers[clauseName];
    controller.addAsExpression(key, config);
    return this;
  }

  setGraphApi(api: IGraphApi) {
    this.graphApi = api;
    return this;
  }

  setGraphObjApi(api: IGraphObjApi) {
    this.graphObjApi = api;
    return this;
  }

  configure(config: any) {
    this.setGraphApi(config.graphApi);
    return this;
  }

  run(objs: GraphObjDef[]): IQueryResult {
    const controller = this.queryController;
    const { matchExec, whereExec, returnExec } = controller as any;
    let aliasMap: any;
    if (matchExec) {
      aliasMap = matchExec.filter(objs);
    }
    if (whereExec) {
      whereExec.configure({ aliasMap });
      aliasMap = whereExec.filter(objs);
    }
    if (!returnExec) {
    }
    if (!aliasMap) {
    }
    return returnExec.process(aliasMap) as IQueryResult;
  }
}
