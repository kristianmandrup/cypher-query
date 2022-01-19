import { AndExprBuilder, OrExprBuilder } from ".";
import { IWhereClauseBuilder } from "..";
import { ClauseBuilder } from "../../../clause";
import { ExprBuilder } from "../../expr-builder";

type ExprFn = () => boolean;

type ExprObj = {
  matches: () => boolean;
};

export type Expression = ExprFn | ExprObj;

export interface IBaseExprBuilder {
  whereExpr: IWhereClauseBuilder;

  matches(expr: any): any;
}

export class BooleanExprBuilder extends ExprBuilder {
  whereClauseBuilder: IWhereClauseBuilder;

  constructor(whereClauseBuilder: IWhereClauseBuilder) {
    super(whereClauseBuilder.q);
    this.whereClauseBuilder = whereClauseBuilder;
  }

  get strategy() {
    return this.whereClauseBuilder.strategy;
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
