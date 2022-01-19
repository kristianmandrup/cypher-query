import { ResultExprBuilder } from "../..";
import { IResultClauseBuilder } from "./result-clause-builder";

export const createOrderByBuilder = (cb: IResultClauseBuilder, config: any) =>
  new OrderByExprBuilder(cb).config(config);

export class OrderByExprBuilder extends ResultExprBuilder {
  exprName: string = "orderBy";
}
