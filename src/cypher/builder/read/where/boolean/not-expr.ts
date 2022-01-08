import { IWhereBuilder } from "..";
import { BaseExprBuilder } from "./base-expr";

export interface INotExprBuilder {
  matches(expr: any): any;
}

export const createNotExprBuilder = (w: IWhereBuilder, config: any) =>
  new NotExprBuilder(w).config(config);

export class NotExprBuilder extends BaseExprBuilder {
  matches(expr: any) {
    // return this.expressions.every((expr) => !this.eval(expr));
  }
}
