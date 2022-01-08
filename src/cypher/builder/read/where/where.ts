import { IQueryBuilder } from "../..";
import { BuilderClause, IBuilderClause } from "../../clause";
import { IOrExprBuilder, IAndExprBuilder, INotExprBuilder } from "./boolean";
import { BaseExprBuilder } from "./boolean/base-expr";

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

  get or(): IOrExprBuilder {
    return this.where.or(this, this.configObj);
  }

  get and(): IAndExprBuilder {
    return this.where.and(this, this.configObj);
  }

  get not(): INotExprBuilder {
    return this.where.not(this, this.configObj);
  }
}
