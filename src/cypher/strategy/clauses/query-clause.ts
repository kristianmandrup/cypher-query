import { IAliasFilterExpr, IFilterExpr } from "..";
import { ClauseType, WhereFilterType } from "../enum";
import { StrategyHandler } from "../strategy-handler";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
  current: IFilterExpr;
  createExpression(key: string, config: any): any;
  addExpressions(...expressions: IFilterExpr[]): IQueryClause;
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IQueryClause;
}

export class QueryClause extends StrategyHandler implements IQueryClause {
  expressions: IFilterExpr[] = [];
  aliasFilterExpr?: IAliasFilterExpr;

  createExpression(key: string, config: any): any {
    return this;
  }

  get current(): IFilterExpr {
    return this.expressions[this.expressions.length - 1];
  }

  addExpressions(...expressions: IFilterExpr[]) {
    this.expressions.push(...expressions);
    return this;
  }

  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr) {
    this.aliasFilterExpr = aliasFilterExpr;
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
