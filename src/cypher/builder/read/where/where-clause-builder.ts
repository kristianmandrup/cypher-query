import { IQueryBuilder } from "../..";
import { ClauseBuilder, IClauseBuilder } from "../../clause-builder";
import { WhereBuilderMap } from "../../map";
import { IOrExprBuilder, IAndExprBuilder, INotExprBuilder } from "./boolean";
import { IWhereSelectAliasExprBuilder } from "./select-alias-expr-builder";

export type NodeMatchFn = (node: any) => boolean;

export const createWhereBuilder = (q: IQueryBuilder, config: any) =>
  new WhereClauseBuilder(q).config(config);

export interface IWhereClauseBuilder extends IClauseBuilder {
  get where(): WhereBuilderMap;
}

export class WhereClauseBuilder
  extends ClauseBuilder
  implements IWhereClauseBuilder
{
  nodeMatches(fn: NodeMatchFn) {}

  get where() {
    return this.builderMap.where;
  }

  obj(alias: string): IWhereSelectAliasExprBuilder {
    return this.where.obj(this, alias);
  }
}
