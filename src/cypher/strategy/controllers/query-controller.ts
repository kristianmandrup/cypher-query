import { IAliasFilterExpr, IFilterExpr, IMatchFilter } from "..";
import { GraphObjDef, IQueryResult } from "../../cypher-types";
import { IMatchController, IReturnController, IWhereController } from ".";

export interface IQueryController {
  match?: IMatchController;
  where?: IWhereController;
  return?: IReturnController;

  run(objs: GraphObjDef[]): IQueryResult | undefined;
}

export class QueryController implements IQueryController {
  match?: IMatchController;
  where?: IWhereController;
  return?: IReturnController;

  run(objs: GraphObjDef[]): IQueryResult | undefined {
    return;
  }

  addFilter(filter: IFilterExpr) {
    // this.filters.push(filter);
    return this;
  }

  setAliasFilter(filter: IAliasFilterExpr) {
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
    this.where && this.where.setAliasFilter(filter);
    return this;
  }
}
