import { IWhereClauseBuilder } from "..";
import { IFilterExpr } from "../../..";
import { ExprBuilder } from "../expr-builder";

export interface IWhereExprBuilder {
  whereClauseBuilder: IWhereClauseBuilder;
  matches(expr: any): any;
}

export class WhereExprBuilder extends ExprBuilder {
  whereClauseBuilder: IWhereClauseBuilder;
  expr?: IFilterExpr;

  constructor(whereClauseBuilder: IWhereClauseBuilder) {
    super(whereClauseBuilder.q);
    this.whereClauseBuilder = whereClauseBuilder;
  }

  get strategy() {
    return this.whereClauseBuilder.strategy;
  }

  setExpression(config: any = {}) {
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    this.addAsExpression(this.exprName, config);
    const expr = this.strategy.latestExpr;
    if (!expr) return this;
    // based on the expr figures out which controller and clause to add it to
    this.expr = expr;
  }
  addAsExpression(name: string, config: any) {
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    return this.strategy.addAsExpression("where", name, config);
  }

  matches(expr: any) {
    return this;
  }

  createFilterFrom(config: any) {
    return {} as any;
  }
}
