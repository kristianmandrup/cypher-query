import { BooleanExprBuilder, IBooleanExprBuilder } from ".";
import { IWhereClauseBuilder } from "..";

export interface IOrExprBuilder extends IBooleanExprBuilder {
  matches(expr: any): any;
}

export const createOrExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new OrExprBuilder(w, config);

export class OrExprBuilder extends BooleanExprBuilder {
  exprName: string = "or";
}
