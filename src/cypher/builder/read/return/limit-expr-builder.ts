import { IReturnNumberExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ReturnNumberExprBuilder } from "./return-number-expr-builder";

export const createŸLimitExprBuilder = (q: IQueryBuilder, config: any) =>
  new LimitExprBuilder(q).config(config);

export interface ILimitExprBuilder extends IReturnNumberExprBuilder {}

export class LimitExprBuilder extends ReturnNumberExprBuilder {}
