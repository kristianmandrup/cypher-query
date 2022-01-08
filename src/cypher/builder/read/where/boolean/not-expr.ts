import { IWhereBuilder } from "..";
import { INotFilterExpr } from "../../../..";
import { BaseExprBuilder, IBaseExprBuilder } from "./base-expr";

export interface INotExprBuilder extends IBaseExprBuilder {}

export const createNotExprBuilder = (w: IWhereBuilder, config: any) =>
  new NotExprBuilder(w).config(config);

export class NotExprBuilder extends BaseExprBuilder {
  expr: INotFilterExpr;

  constructor(w: IWhereBuilder, config: any = {}) {
    super(w);
    this.expr = this.strategyMap.filter.exprMap.boolean.not(config);
  }

  matches(config: any) {
    const expr = this.createFilterFrom(config);
    this.expr.setComposedFilter(expr);
    return this;
  }
}
