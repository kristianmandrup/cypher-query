import {
  IResultNumberExprBuilder,
  ResultNumberExprBuilder,
} from "./result-number-expr-builder";
import { IQueryBuilder } from "../..";

export const createSkipExprBuilder = (q: IQueryBuilder, config: any) =>
  new SkipExprBuilder(q).config(config);

export interface ISkipExprBuilder extends IResultNumberExprBuilder {}

export class SkipExprBuilder extends ResultNumberExprBuilder {}
