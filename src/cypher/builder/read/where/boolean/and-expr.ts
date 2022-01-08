import { IWhereBuilder } from "..";
import { IAndFilterExpr } from "../../../..";
import { BaseExprBuilder, IBaseExprBuilder } from "./base-expr";

export interface IAndExprBuilder extends IBaseExprBuilder {}

export const createAndExprBuilder = (w: IWhereBuilder, config: any) =>
  new AndExprBuilder(w, config);

export class AndExprBuilder extends BaseExprBuilder {
  expr: IAndFilterExpr;

  constructor(w: IWhereBuilder, config: any = {}) {
    super(w);
    this.expr = this.strategyMap.filter.exprMap.boolean.and(config);
  }

  matches(config: any) {
    const expr = this.createFilterFrom(config);
    this.expr.addFilter(expr);
    return this;
  }
}
