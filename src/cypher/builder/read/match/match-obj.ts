import { IMatchObjExpr } from ".";
import { IQueryBuilder } from "../..";
import { MatchObjExpr } from "../../..";
import { Props } from "../../../cypher-types";
import { BuilderClause } from "../../clause";

export interface MatchObjConfig {
  alias?: string;
  labels?: string[];
  props?: Props;
}

export interface IMatchObject {
  matches(config: MatchObjConfig): any;
}

export const createMatchObjBuilder = (q: IQueryBuilder, config: any) =>
  new MatchObjBuilder(q).config(config);

export class MatchObjBuilder extends BuilderClause implements IMatchObject {
  alias: string = "_";
  $optional: boolean = false;

  config(config: MatchObjConfig) {
    this.setAlias(config.alias);
    return super.config(config);
  }

  optional() {
    this.$optional = true;
    return this;
  }

  protected setAlias(alias: string = "_") {
    this.alias = alias;
    return this;
  }

  matches(config: MatchObjConfig) {
    const { alias } = this;
    return {};
  }
}
