import { IWhereBuilder } from "..";
import { BaseExprBuilder, IBaseExprBuilder } from "./base-expr";

export interface INotExprBuilder extends IBaseExprBuilder {}

export const createNotExprBuilder = (w: IWhereBuilder, config: any) =>
  new NotExprBuilder(w).config(config);

export class NotExprBuilder extends BaseExprBuilder {
  matches(config: any) {
    this.strategyMap.filter.exprMap.boolean.not(config);
    return this;
  }
}
