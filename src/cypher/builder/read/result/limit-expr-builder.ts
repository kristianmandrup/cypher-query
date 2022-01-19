import { IQueryBuilder } from "../..";
import { IResultNumberExprBuilder } from "./result-number-expr-builder";
import { ResultNumberExprBuilder } from "./result-number-expr-builder";

export const createŸLimitExprBuilder = (q: IQueryBuilder, config: any) =>
  new LimitExprBuilder(q).config(config);

export interface ILimitExprBuilder extends IResultNumberExprBuilder {}

export class LimitExprBuilder extends ResultNumberExprBuilder {}
