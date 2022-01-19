import { IQueryBuilder } from "../..";
import { Props } from "../../../cypher-types";
import { ClauseBuilder } from "../../clause";
import { ExprBuilder } from "../expr-builder";

export interface MatchObjConfig {
  alias?: string;
  labels?: string[];
  props?: Props;
}

export interface IMatchObjExprBuilder {
  matches(config: MatchObjConfig): any;
}

export const createMatchObjExprBuilder = (q: IQueryBuilder, config: any) =>
  new MatchObjExprBuilder(q).config(config);

export class MatchObjExprBuilder
  extends ExprBuilder
  implements IMatchObjExprBuilder
{
  alias: string = "_";
  $optional: boolean = false;
  exprName: string = "obj";

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
