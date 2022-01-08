import { IReturnClause } from ".";
import { IQueryBuilder } from "../..";
import { ReturnClause } from "./return-clause";

export const createUnionExprBuilder = (q: IQueryBuilder, config: any) =>
  new UnionExprBuilder(q).config(config);

export interface IUnionExprBuilder extends IReturnClause {}

export class UnionExprBuilder extends ReturnClause {}
