import { MatchObjExpr } from "../../..";
import { Props } from "../../../cypher-types";
import { Clause } from "../../clause";

export interface MatchObjConfig {
  alias?: string;
  labels?: string[];
  props?: Props;
}

export class MatchObj extends Clause {
  alias: string = "_";

  config({ alias }: MatchObjConfig) {
    this.setAlias(alias);
  }

  protected setAlias(alias: string = "_") {
    this.alias = alias;
    return this;
  }

  matches(config: MatchObjConfig) {
    const { alias } = this;
    return new MatchObjExpr().config({ alias, ...config });
  }
}
