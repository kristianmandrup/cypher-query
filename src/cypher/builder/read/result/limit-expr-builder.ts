import { IReturnNumberExprBuilder } from "../return";
import { IQueryBuilder } from "../..";
import { ReturnNumberExprBuilder } from "./result-number-expr-builder";

export const createŸLimitExprBuilder = (q: IQueryBuilder, config: any) =>
  new LimitExprBuilder(q).config(config);

export interface ILimitExprBuilder extends IReturnNumberExprBuilder {}

export class LimitExprBuilder extends ReturnNumberExprBuilder {}
