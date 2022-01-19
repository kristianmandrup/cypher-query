import { IResultExprBuilder, ResultExprBuilder } from ".";
import { IResultClauseBuilder } from "./result-clause-builder";

export const createUnionExprBuilder = (cb: IResultClauseBuilder, config: any) =>
  new UnionExprBuilder(cb).config(config);

export interface IUnionExprBuilder extends IResultExprBuilder {}

export class UnionExprBuilder extends ResultExprBuilder {
  exprName: string = "union";
}
