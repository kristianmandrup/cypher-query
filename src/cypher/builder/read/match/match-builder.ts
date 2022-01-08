import { MatchObjBuilder } from "./match-obj";
import { BuilderClause } from "../../clause";
import { IQueryBuilder } from "../..";
import { IMatchObject } from ".";

export const createMatchBuilder = (q: IQueryBuilder, config: any) =>
  new MatchBuilder(q).config(config);

export interface IMatchBuilder {
  obj(alias: string): IMatchObject;
}

export class MatchBuilder extends BuilderClause {
  obj(alias: string = "_") {
    return new MatchObjBuilder(this.q).config({ alias });
  }
}
