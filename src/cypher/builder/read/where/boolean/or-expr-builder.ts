import { IWhereClauseBuilder } from "..";
import { BaseExprBuilder, IBaseExprBuilder } from "./boolean-expr-builder";

export interface IOrExprBuilder extends IBaseExprBuilder {
  matches(expr: any): any;
}

export const createOrExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new OrExprBuilder(w).config(config);

export class OrExprBuilder extends BaseExprBuilder {
  matches(config: any) {
    // this.strategy.addExpressionFor(config);
    return this;
  }
}
