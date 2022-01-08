import { IWhereBuilder } from "..";
import { BaseExprBuilder } from "./base-expr";

export interface IOrExprBuilder {
  matches(expr: any): any;
}

export const createOrExprBuilder = (w: IWhereBuilder, config: any) =>
  new OrExprBuilder(w).config(config);

export class OrExprBuilder extends BaseExprBuilder {
  matches(expr: any) {
    return this.expressions.some((expr) => this.eval(expr));
  }
}
