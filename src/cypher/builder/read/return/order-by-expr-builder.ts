import { IQueryBuilder } from "../..";
import { ClauseBuilder } from "../../clause";

export const createOrderByBuilder = (q: IQueryBuilder, config: any) =>
  new OrderByExprBuilder(q).config(config);

export class OrderByExprBuilder extends ClauseBuilder {}
