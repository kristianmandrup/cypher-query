import { IQueryBuilder } from "../..";
import { ClauseBuilder, IClauseBuilder } from "../../clause";
import { IOrExprBuilder, IAndExprBuilder, INotExprBuilder } from "./boolean";

export type NodeMatchFn = (node: any) => boolean;

export const createWhereBuilder = (q: IQueryBuilder, config: any) =>
  new WhereClauseBuilder(q).config(config);

export interface IWhereClauseBuilder extends IClauseBuilder {
  or: IOrExprBuilder;
  and: IAndExprBuilder;
  not: INotExprBuilder;
}

export class WhereClauseBuilder extends ClauseBuilder {
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
