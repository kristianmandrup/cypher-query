import { IWhereClauseBuilder } from "..";
import { IAndFilterExpr } from "../../../..";
import { BaseExprBuilder, IBaseExprBuilder } from "./boolean-expr-builder";

export interface IAndExprBuilder extends IBaseExprBuilder {}

export const createAndExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new AndExprBuilder(w, config);

export class AndExprBuilder extends BaseExprBuilder {
  expr: IAndFilterExpr;

  constructor(w: IWhereClauseBuilder, config: any = {}) {
    super(w);
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    const expr = this.strategy.where.createExpression("and", config);
    // based on the expr figures out which controller and clause to add it to
    this.strategy.addExpression(expr);
    this.expr = expr;
  }

  matches(config: any) {
    const expr = this.createFilterFrom(config);
    this.expr.addFilter(expr);
    return this;
  }
}
