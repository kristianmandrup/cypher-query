import { IWhereClauseBuilder, IWhereExprBuilder, WhereExprBuilder } from "..";

export interface ILabelExprBuilder extends IWhereExprBuilder {
  matches(expr: any): any;
}

export const createLabelExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new LabelExprBuilder(w).config(config);

export class LabelExprBuilder extends WhereExprBuilder {
  exprName: string = "or";
}
