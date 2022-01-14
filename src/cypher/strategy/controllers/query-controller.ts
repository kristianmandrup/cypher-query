import { IAliasFilterExpr, IFilterExpr, IMatchFilter } from "..";
import { GraphObjDef, IQueryResult } from "../../cypher-types";
import {
  IMatchController,
  IReturnController,
  IWhereController,
  MatchController,
  ReturnController,
  WhereController,
} from ".";
import { StrategyHandler } from "../strategy-handler";

export interface IQueryController {
  match: IMatchController;
  where: IWhereController;
  return: IReturnController;

  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IQueryController;
  run(objs: GraphObjDef[]): IQueryResult | undefined;
}

export class QueryController
  extends StrategyHandler
  implements IQueryController
{
  match: IMatchController = new MatchController(this.strategy);
  where: IWhereController = new WhereController(this.strategy);
  return: IReturnController = new ReturnController(this.strategy);

  run(objs: GraphObjDef[]): IQueryResult | undefined {
    return;
  }

  addFilter(filter: IFilterExpr) {
    // this.filters.push(filter);
    return this;
  }

  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr) {
    return this;
  }

  // addMatchFilters(...filters: IMatchObjExpr[]) {
  //   this.match.push(...filters);
  //   return this;
  // }

  addWhereFilters(...filters: IAliasFilterExpr[]) {
    const addFilterFn = this.addWhereFilter.bind(this);
    filters.map(addFilterFn);
    return this;
  }

  addReturnFilters(...filters: IAliasFilterExpr[]) {
    // this.return.push(...filters);
    return this;
  }

  addWhereFilter(filter: IAliasFilterExpr) {
    this.where && this.where.setAliasFilterExpr(filter);
    return this;
  }
}
