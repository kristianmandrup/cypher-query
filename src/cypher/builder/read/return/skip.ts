import { IQueryBuilder } from "../..";
import {
  IReturnNumberClause,
  ReturnNumberClause,
} from "./return-number-clause";

export const createSkipExprBuilder = (q: IQueryBuilder, config: any) =>
  new SkipExprBuilder(q).config(config);

export interface ISkipExprBuilder extends IReturnNumberClause {}

export class SkipExprBuilder extends ReturnNumberClause {}
