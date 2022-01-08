import { IWhereBuilder } from "..";
import { BaseExprBuilder, IBaseExprBuilder } from "./base-expr";

export interface IAndExprBuilder extends IBaseExprBuilder {}

export const createAndExprBuilder = (w: IWhereBuilder, config: any) =>
  new AndExprBuilder(w).config(config);

export class AndExprBuilder extends BaseExprBuilder {
  matches(config: any) {
    this.strategyMap.filter.exprMap.boolean.and(config);
    return this;
  }
}
