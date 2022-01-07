import { IMatchObjExpr } from ".";
import { MatchObjExpr } from "../../..";
import { Props } from "../../../cypher-types";
import { BuilderClause } from "../../clause";

export interface MatchObjConfig {
  alias?: string;
  labels?: string[];
  props?: Props;
}

export interface IMatchObject {
  matches(config: MatchObjConfig): IMatchObjExpr;
}

export class MatchObj extends BuilderClause implements IMatchObject {
  alias: string = "_";

  config(config: MatchObjConfig) {
    this.setAlias(config.alias);
    return super.config(config);
  }

  protected setAlias(alias: string = "_") {
    this.alias = alias;
    return this;
  }

  matches(config: MatchObjConfig) {
    const { alias } = this;
    return new MatchObjExpr(this.q).config({ alias, ...config });
  }
}
