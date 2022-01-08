import { Csv } from "./load";
import { defaultStrategyMap } from "../strategy/defaults";
import { IStrategyMap } from "../strategy/map";
import { defaultBuilderMap, IBuilderMap } from "./map";
import { Props } from "../cypher-types";

export interface IQueryBuilder {
  configObj: any;
  aliasMap: Props;
  strategyMap: IStrategyMap;
  builderMap: IBuilderMap;
  mergeAliasMap(aliasMap: Props, name?: string): void;
}

export class QueryBuilder {
  strategyMap: IStrategyMap = defaultStrategyMap();
  builderMap: IBuilderMap = defaultBuilderMap();
  aliasMap: Props = {};
  configObj: any;

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

  get loadCsv() {
    return new Csv(this);
  }

  get create() {
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
