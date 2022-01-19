import { IWhereClauseBuilder } from "..";
import { IFilterExpr } from "../../../..";
import { BooleanExprBuilder, IBaseExprBuilder } from "./boolean-expr-builder";

export interface IAndExprBuilder extends IBaseExprBuilder {}

export const createAndExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new AndExprBuilder(w, config);

export class AndExprBuilder extends BooleanExprBuilder {
  expr: IFilterExpr;

  constructor(w: IWhereClauseBuilder, config: any = {}) {
    super(w);
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    const expr = this.addAsExpression("and", config);
    // based on the expr figures out which controller and clause to add it to
    this.expr = this.strategy.latestExpr as IFilterExpr;
  }

  matches(config: any) {
    // this.expr.addAsExpression(config);
    return this;
  }
}
