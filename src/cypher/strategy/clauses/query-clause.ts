import { IAliasFilterExpr, IFilterExpr } from "..";
import { ClauseType, WhereFilterType } from "../enum";
import { StrategyHandler } from "../strategy-handler";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
  current: IFilterExpr;
  createExpression(key: string, config: any): IFilterExpr | undefined;
  addAsExpression(key: string, config: any): IQueryClause;
  addExpressions(...expressions: IFilterExpr[]): IQueryClause;
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IQueryClause;
}

export class QueryClause extends StrategyHandler implements IQueryClause {
  expressions: IFilterExpr[] = [];
  aliasFilterExpr?: IAliasFilterExpr;

  get current(): IFilterExpr {
    return this.expressions[this.expressions.length - 1];
  }

  addAsExpression(key: string, config: any): IQueryClause {
    const expr = this.createExpression(key, config);
    expr && this.addExpressions(expr);
    return this;
  }

  createExpression(key: string, config: any): IFilterExpr | undefined {
    return;
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
