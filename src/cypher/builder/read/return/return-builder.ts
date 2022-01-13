import { IQueryBuilder } from "../..";
import { ClauseBuilder } from "../../clause";

export const createReturnBuilder = (q: IQueryBuilder, config: any) =>
  new ReturnBuilder(q).config(config);

export interface IReturnBuilder {}

export class ReturnBuilder extends ClauseBuilder {}
