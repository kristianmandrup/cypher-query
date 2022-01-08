import { IQueryBuilder } from "../..";
import { BuilderClause } from "../../clause";

export const createOrderByBuilder = (q: IQueryBuilder, config: any) =>
  new OrderByBuilder(q).config(config);

export class OrderByBuilder extends BuilderClause {}
