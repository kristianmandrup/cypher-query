import { IResultExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ClauseBuilder } from "../../clause";

export const createResultClauseBuilder = (q: IQueryBuilder, config: any) =>
  new ResultClauseBuilder(q).config(config);

export interface IResultClauseBuilder {
  obj(alias: string): IResultExprBuilder;
}

export class ResultClauseBuilder extends ClauseBuilder {}
