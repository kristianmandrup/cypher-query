import { ICypherStrategy } from "..";
import { Props } from "../cypher-types";
import { IStrategyMap } from "../strategy/map";
import { IQueryBuilder } from "./builder";
import { Handler } from "./handler";
import { IBuilderMap } from "./map";

export interface IClauseBuilder {
  q: IQueryBuilder;
  builderMap: IBuilderMap;
  strategy: ICypherStrategy;
}

export class ClauseBuilder extends Handler {
  q: IQueryBuilder;

  get strategy() {
    return this.q.strategy;
  }

  get configObj() {
    return this.q.configObj;
  }

  get builderMap() {
    return this.q.builderMap;
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
