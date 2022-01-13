import { Csv } from "./load";
import { defaultStrategyMap } from "../strategy/defaults";
import { IStrategyMap } from "../strategy/map";
import { defaultBuilderMap, IBuilderMap } from "./map";
import { Props } from "../cypher-types";
import { ICypherStrategy } from "..";

export interface IQueryBuilder {
  configObj: any;
  aliasMap: Props;
  strategy: ICypherStrategy;
  builderMap: IBuilderMap;
  mergeAliasMap(aliasMap: Props, name?: string): void;
}

export class QueryBuilder {
  strategy: ICypherStrategy;
  builderMap: IBuilderMap = defaultBuilderMap();
  aliasMap: Props = {};
  configObj: any;

  constructor(strategy: ICypherStrategy) {
    this.strategy = strategy;
  }

  config(config: any) {
    this.configObj = config;
    return this;
  }

  mergeAliasMap(aliasMap: Props, name = "alias") {
    this.aliasMap[name] = {
      ...(this.aliasMap[name] || {}),
      ...(aliasMap || {}),
    };
    return aliasMap;
  }

  get loadCsv(): Csv {
    return new Csv(this);
  }

  get create(): any {
    return this.builderMap.create.root(this, this.configObj);
  }

  get delete() {
    return this.builderMap.delete.root(this, this.configObj);
  }

  get match() {
    return this.builderMap.match.root(this, this.configObj);
  }

  get where() {
    return this.builderMap.where.root(this, this.configObj);
  }

  get return() {
    return this.builderMap.return.root(this, this.configObj);
  }
}
