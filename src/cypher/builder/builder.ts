import { IMatchAlias } from "./read";
import { IResultExpr, IStrategyResult, Props } from "../cypher-types";
import { ICreateBuilder, IDeleteBuilder } from "./write";
import { Csv } from "./load";
import { defaultStrategyMap } from "../strategy/defaults";
import { IStrategyMap } from "../strategy/map";
import { IBuilderMap } from "./map";

export interface IQueryBuilder {
  aliasMap: Props;
  strategyMap: IStrategyMap;
  builderMap: IBuilderMap;
  mergeAliasMap(aliasMap: Props, name?: string): void;
}

export class QueryBuilder {
  strategyMap: IStrategyMap = defaultStrategyMap();
  builderMap: IBuilderMap = {};
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
    return new Create(this);
  }

  get delete() {
    return this.builderMap.delete.root(this, this.configObj);
  }

  get match() {
    return this.strategyMap.match.root(this, this.configObj);
  }

  get where() {
    return this.strategyMap.filter.root(this);
  }

  get return() {
    return this.strategyMap.result.root(this);
  }
}
