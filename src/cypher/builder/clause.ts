import { Props } from "../cypher-types";
import { IStrategyMap } from "../strategy/map";
import { IQueryBuilder } from "./builder";
import { Handler } from "./handler";
import { IBuilderMap } from "./map";

export interface IBuilderClause {
  q: IQueryBuilder;
  builderMap: IBuilderMap;
  strategyMap: IStrategyMap;
}

export class BuilderClause extends Handler {
  q: IQueryBuilder;

  get builderMap() {
    return this.q.builderMap;
  }

  get strategyMap() {
    return this.q.strategyMap;
  }

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  config(config: any) {
    return this;
  }

  firstFromMap(map: Props) {
    return map.values()[0];
  }

  get aliasMap() {
    return this.q.aliasMap;
  }

  error(...msg: any[]) {
    console.log(...msg);
  }

  mergeAliasMap(aliasMap: Props, name?: string) {
    return this.q.mergeAliasMap(aliasMap, name);
  }
}
