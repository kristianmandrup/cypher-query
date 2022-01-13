import { MatchObjBuilder } from "./match-obj-builder";
import { ClauseBuilder } from "../../clause";
import { IQueryBuilder } from "../..";
import { IMatchObject } from ".";

export const createMatchBuilder = (q: IQueryBuilder, config: any) =>
  new MatchClauseBuilder(q).config(config);

export interface IMatchClauseBuilder {
  obj(alias: string): IMatchObject;
}

export class MatchClauseBuilder extends ClauseBuilder {
  obj(alias: string = "_") {
    return new MatchObjBuilder(this.q).config({ alias });
  }
}
