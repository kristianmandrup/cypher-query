import { IAliasFilterExpr, IFilterExpr, IMatchFilter } from "..";
import { GraphObjDef, IQueryResult } from "../../cypher-types";
import {
  MatchController,
  ResultController,
  ReturnController,
  WhereController,
} from ".";
import { StrategyHandler } from "../strategy-handler";
import { IBaseController } from "./base-controller";

export interface IControllersMap {
  [key: string]: IBaseController;
}

export interface IQueryController {
  controllers: IControllersMap;
  latestExpr?: IFilterExpr;
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IQueryController;
  run(objs: GraphObjDef[]): IQueryResult | undefined;
}

export class QueryController
  extends StrategyHandler
  implements IQueryController
{
  controllers: IControllersMap = {
    match: new MatchController(this.strategy),
    where: new WhereController(this.strategy),
    return: new ReturnController(this.strategy),
    result: new ResultController(this.strategy),
  };

  latestController?: IBaseController;

  get latestExpr() {
    return this.latestController && this.latestController.latestExpr;
  }

  run(objs: GraphObjDef[]): IQueryResult | undefined {
    return;
  }

  addAsExpression(name: string, key: string, config: any): IQueryController {
    const controller = this.controllers[name];
    this.latestController = controller;
    controller.addAsExpression(key, config);
    controller.currentClause.latestExpr;
    return this;
  }

  addFilter(filter: IFilterExpr) {
    // this.filters.push(filter);
    return this;
  }

  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr) {
    return this;
  }
}
