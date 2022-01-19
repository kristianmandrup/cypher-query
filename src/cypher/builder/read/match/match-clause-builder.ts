import { ClauseBuilder } from "../../clause-builder";
import { IQueryBuilder } from "../..";
import {
  IMatchObjExprBuilder,
  MatchObjExprBuilder,
} from "./match-obj-expr-builder";

export const createMatchClauseBuilder = (q: IQueryBuilder, config: any) =>
  new MatchClauseBuilder(q).config(config);

export interface IMatchClauseBuilder {
  obj(alias: string): IMatchObjExprBuilder;
}

export class MatchClauseBuilder extends ClauseBuilder {
  obj(alias: string = "_") {
    return new MatchObjExprBuilder(this.queryBuilder).config({ alias });
  }
}
