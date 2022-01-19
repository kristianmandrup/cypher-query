import { IReturnExprBuilder, ReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";

export interface IReturnPropExprBuilder extends IReturnExprBuilder {
  matches(expr: any): any;
}

export const createReturnPropExprBuilder = (q: IQueryBuilder, config: any) =>
  new PropExprBuilder(q).config(config);

export class PropExprBuilder extends ReturnExprBuilder {
  exprName: string = "or";
}
