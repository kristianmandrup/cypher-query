import { IReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ClauseBuilder } from "../../clause";

export const createReturnClauseBuilder = (q: IQueryBuilder, config: any) =>
  new ReturnClauseBuilder(q).config(config);

export interface IReturnClauseBuilder {
  obj(alias: string): IReturnExprBuilder;
}

export class ReturnClauseBuilder extends ClauseBuilder {}
