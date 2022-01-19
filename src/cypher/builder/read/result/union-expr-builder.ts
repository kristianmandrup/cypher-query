import { IResultExprBuilder, ResultExprBuilder } from ".";
import { IQueryBuilder } from "../..";

export const createUnionExprBuilder = (q: IQueryBuilder, config: any) =>
  new UnionExprBuilder(q).config(config);

export interface IUnionExprBuilder extends IResultExprBuilder {}

export class UnionExprBuilder extends ResultExprBuilder {
  exprName: string = "union";
}
