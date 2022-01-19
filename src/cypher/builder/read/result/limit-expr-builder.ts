import { IQueryBuilder } from "../..";
import { IClauseBuilder } from "../../clause-builder";
import { IResultClauseBuilder } from "./result-clause-builder";
import { IResultNumberExprBuilder } from "./result-number-expr-builder";
import { ResultNumberExprBuilder } from "./result-number-expr-builder";

export const createLimitExprBuilder = (cb: IResultClauseBuilder, config: any) =>
  new LimitExprBuilder(cb).config(config);

export interface ILimitExprBuilder extends IResultNumberExprBuilder {}

export class LimitExprBuilder extends ResultNumberExprBuilder {
  exprName: string = "limit";
}
