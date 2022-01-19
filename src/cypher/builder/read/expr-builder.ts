import { Handler, IQueryBuilder } from "..";
import { ICypherStrategy, IFilterExpr } from "../..";
import { IClauseBuilder } from "../clause-builder";

export interface IExprBuilder {
  exprName: string;
  clauseName: string;
  q: IQueryBuilder;
  clauseBuilder?: IClauseBuilder;
  expr?: IFilterExpr;
  strategy: ICypherStrategy;
  config(config: any): IExprBuilder;
  setExpression(config: any): IExprBuilder;
  addAsExpression(name: string, config: any): IExprBuilder;
}

export class ExprBuilder extends Handler implements IExprBuilder {
  q: IQueryBuilder;
  clauseBuilder?: IClauseBuilder;
  exprName: string = "";
  clauseName: string = "";
  expr?: IFilterExpr;
  configObj: any;

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  get strategy() {
    return this.q.strategy;
  }

  config(config: any) {
    this.configObj = config;
    return this;
  }

  setExpression(config: any = {}) {
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    this.addAsExpression(this.exprName, config);
    const expr = this.strategy.latestExpr;
    if (!expr) return this;
    // based on the expr figures out which controller and clause to add it to
    this.expr = expr;
    return this;
  }

  addAsExpression(name: string, config: any) {
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    this.strategy.addAsExpression(this.clauseName, name, config);
    return this;
  }
}
