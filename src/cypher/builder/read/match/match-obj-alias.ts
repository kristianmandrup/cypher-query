import { MatchObj } from "./match-obj";
import { Clause } from "../../clause";
import { IQueryBuilder } from "../..";
import { IMatchObject } from ".";

export const createMatchAlias = (q: IQueryBuilder, config: any) =>
  new MatchAlias(q).config(config);

export interface IMatchAlias {
  obj(alias: string): IMatchObject;
}

export class MatchAlias extends Clause {
  obj(alias: string = "_") {
    return new MatchObj(this.q).config({ alias });
  }
}
