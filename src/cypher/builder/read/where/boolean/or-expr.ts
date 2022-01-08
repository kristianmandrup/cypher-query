import { IWhereBuilder } from "..";
import { BaseExprBuilder, IBaseExprBuilder } from "./base-expr";

export interface IOrExprBuilder extends IBaseExprBuilder {
  matches(expr: any): any;
}

export const createOrExprBuilder = (w: IWhereBuilder, config: any) =>
  new OrExprBuilder(w).config(config);

export class OrExprBuilder extends BaseExprBuilder {
  matches(config: any) {
    this.strategyMap.filter.exprMap.boolean.or(config);
    return this;
  }
}
