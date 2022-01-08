import { IWhereBuilder } from "..";
import { BaseExprBuilder } from "./base-expr";

export interface IAndExprBuilder {
  matches(expr: any): any;
}

export const createAndExprBuilder = (w: IWhereBuilder, config: any) =>
  new AndExprBuilder(w).config(config);

export class AndExprBuilder extends BaseExprBuilder {
  matches(expr: any) {
    // return this.expressions.every((expr) => this.eval(expr));
  }
}
