import { IAliasFilterExpr, IFilterExpr, IMatchFilter } from "..";
import { IQueryResult } from "../../cypher-types";
import { IMatchController, IReturnController, IWhereController } from ".";

export interface IQueryController {
  match?: IMatchController;
  where?: IWhereController;
  return?: IReturnController;

  run(): IQueryResult | undefined;
}

export class QueryController implements IQueryController {
  match?: IMatchController;
  where?: IWhereController;
  return?: IReturnController;

  run(): IQueryResult | undefined {
    return;
  }

  addFilter(filter: IFilterExpr) {
    // this.filters.push(filter);
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
    // const { where } = this;
    // const bucket: any[] = filter.isOptional ? where.optional : where.must;
    // bucket.push(filter);
    return this;
  }
}
