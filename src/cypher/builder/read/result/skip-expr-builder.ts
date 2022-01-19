import {
  IResultNumberExprBuilder,
  ResultNumberExprBuilder,
} from "./result-number-expr-builder";
import { IResultClauseBuilder } from "./result-clause-builder";

export const createSkipExprBuilder = (cb: IResultClauseBuilder, config: any) =>
  new SkipExprBuilder(cb).config(config);

export interface ISkipExprBuilder extends IResultNumberExprBuilder {}

export class SkipExprBuilder extends ResultNumberExprBuilder {
  exprName: string = "skip";
}
