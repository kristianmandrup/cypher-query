import { IAliasFilterExpr, IFilterExpr } from "..";
import { IMatchObjExpr } from "../..";

export interface IWhereFilterBucket {
  must: [];
  optional: [];
}

export interface IFilterTree {
  match: IMatchObjExpr[];
  where: IWhereFilterBucket;
  return: IAliasFilterExpr[];

  addFilter(filter: IFilterExpr): IFilterTree;
}

export class FilterTree implements IFilterTree {
  match: IMatchObjExpr[] = [];
  where: IWhereFilterBucket = {
    must: [],
    optional: [],
  };
  return: IAliasFilterExpr[] = [];

  addFilter(filter: IFilterExpr) {
    // this.filters.push(filter);
    return this;
  }

  addMatchFilters(...filters: IMatchObjExpr[]) {
    this.match.push(...filters);
    return this;
  }

  addWhereFilters(...filters: IAliasFilterExpr[]) {
    const addFilterFn = this.addWhereFilter.bind(this);
    filters.map(addFilterFn);
    return this;
  }

  addReturnFilters(...filters: IAliasFilterExpr[]) {
    this.return.push(...filters);
    return this;
  }

  addWhereFilter(filter: IAliasFilterExpr) {
    const { where } = this;
    const bucket: any[] = filter.isOptional ? where.optional : where.must;
    bucket.push(filter);
    return this;
  }
}
