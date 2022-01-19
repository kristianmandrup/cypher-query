import { IResultExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ClauseBuilder, IClauseBuilder } from "../../clause-builder";

export const createResultClauseBuilder = (q: IQueryBuilder, config: any) =>
  new ResultClauseBuilder(q).config(config);

export interface IResultClauseBuilder extends IClauseBuilder {
  // obj(alias: string): IResultExprBuilder;
}

export class ResultClauseBuilder
  extends ClauseBuilder
  implements IResultClauseBuilder {}
