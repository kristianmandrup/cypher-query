import { IReturnNumberExprBuilder, ReturnNumberExprBuilder } from ".";
import { IQueryBuilder } from "../..";

export const createSkipExprBuilder = (q: IQueryBuilder, config: any) =>
  new SkipExprBuilder(q).config(config);

export interface ISkipExprBuilder extends IReturnNumberExprBuilder {}

export class SkipExprBuilder extends ReturnNumberExprBuilder {}
