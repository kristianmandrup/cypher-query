import { IWhereClauseBuilder, IWhereExprBuilder, WhereExprBuilder } from "..";

export interface IPropExprBuilder extends IWhereExprBuilder {
  matches(expr: any): any;
}

export const createPropExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new PropExprBuilder(w).config(config);

export class PropExprBuilder extends WhereExprBuilder {
  exprName: string = "or";
}
