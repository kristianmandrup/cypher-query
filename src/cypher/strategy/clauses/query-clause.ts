import { IAliasFilterExpr, IFilterExpr } from "..";
import { ClauseType, WhereFilterType } from "../enum";
import { StrategyHandler } from "../strategy-handler";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
  createExpression(key: string, config: any): any;
  addExpression(...expressions: IFilterExpr[]): IQueryClause;
  setAliasFilter(filter: IAliasFilterExpr): IQueryClause;
}

export class QueryClause extends StrategyHandler implements IQueryClause {
  expressions: IFilterExpr[] = [];
  aliasFilter?: IAliasFilterExpr;

  createExpression(key: string, config: any): any {
    return this;
  }

  addExpression(...expressions: IFilterExpr[]) {
    this.expressions.push(...expressions);
    return this;
  }

  setAliasFilter(filter: IAliasFilterExpr) {
    this.aliasFilter = filter;
    return this;
  }

  subtype: WhereFilterType = WhereFilterType.none;

  error(msg: string) {
    throw new Error(msg);
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
