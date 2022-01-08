import { IQueryBuilder } from "../..";
import {
  IReturnNumberClause,
  ReturnNumberClause,
} from "./return-number-clause";

export const createŸLimitExprBuilder = (q: IQueryBuilder, config: any) =>
  new LimitExprBuilder(q).config(config);

export interface ILimitExprBuilder extends IReturnNumberClause {}

export class LimitExprBuilder extends ReturnNumberClause {}
