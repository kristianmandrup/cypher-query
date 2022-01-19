import { ICypherStrategy } from "..";
import { Props } from "../cypher-types";
import { IQueryBuilder } from "./query-builder";
import { Handler } from "./handler";
import { IBuilderMap } from "./map";

export interface IClauseBuilder {
  queryBuilder: IQueryBuilder;
  builderMap: IBuilderMap;
  strategy: ICypherStrategy;
}

export class ClauseBuilder extends Handler {
  queryBuilder: IQueryBuilder;

  get strategy() {
    return this.queryBuilder.strategy;
  }

  get configObj() {
    return this.queryBuilder.configObj;
  }

  get builderMap() {
    return this.queryBuilder.builderMap;
  }

  constructor(q: IQueryBuilder) {
    super();
    this.queryBuilder = q;
  }

  config(config: any) {
    return this;
  }

  firstFromMap(map: Props) {
    return map.values()[0];
  }

  get aliasMap() {
    return this.queryBuilder.aliasMap;
  }

  error(...msg: any[]) {
    console.log(...msg);
  }

  mergeAliasMap(aliasMap: Props, name?: string) {
    return this.queryBuilder.mergeAliasMap(aliasMap, name);
  }
}
