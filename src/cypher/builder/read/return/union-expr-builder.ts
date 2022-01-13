import { IReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ReturnExprBuilder } from "./return-expr-builder";

export const createUnionExprBuilder = (q: IQueryBuilder, config: any) =>
  new UnionExprBuilder(q).config(config);

export interface IUnionExprBuilder extends IReturnExprBuilder {}

export class UnionExprBuilder extends ReturnExprBuilder {}
