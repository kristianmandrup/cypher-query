import { IQueryBuilder } from "../..";
import { BuilderClause, IBuilderClause } from "../../clause";
import { IOrExprBuilder, IAndExprBuilder, INotExprBuilder } from "./boolean";

export type NodeMatchFn = (node: any) => boolean;

export const createWhereBuilder = (q: IQueryBuilder, config: any) =>
  new WhereBuilder(q).config(config);

export interface IWhereBuilder extends IBuilderClause {
  or: IOrExprBuilder;
  and: IAndExprBuilder;
  not: INotExprBuilder;
}

export class WhereBuilder extends BuilderClause {
  nodeMatches(fn: NodeMatchFn) {}

  protected get where() {
    return this.builderMap.where;
  }

  get or() {
    return this.where.or(this);
  }

  get and() {
    return this.where.and(this);
  }

  get not() {
    return this.where.not(this);
  }
}
