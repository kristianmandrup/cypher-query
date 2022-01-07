import { IMatchAlias } from "./read";
import { IResultExpr, IStrategyResult, Props } from "../cypher-types";
import { Create, IDeleteBuilder } from "./write";
import { Csv } from "./load";
import { IFilterExpr, IStrategyFilter } from "..";
import { defaultStrategyMap } from "../strategy/defaults";

type FilterExprFactoryFn = (
  filter: IStrategyFilter,
  config?: any
) => IFilterExpr;
type ResultExprFactoryFn = (
  result: IStrategyResult,
  config?: any
) => IResultExpr;

export interface IPropFilterExprMap {
  eq: FilterExprFactoryFn;
  gt: FilterExprFactoryFn;
  lt: FilterExprFactoryFn;
}

export interface ILabelsFilterExprMap {
  include: FilterExprFactoryFn;
  match: FilterExprFactoryFn;
}

export interface IBooleanFilterExprMap {
  and: FilterExprFactoryFn;
  or: FilterExprFactoryFn;
  not: FilterExprFactoryFn;
}

export interface IFilterExprMap {
  boolean: IBooleanFilterExprMap;
  props: IPropFilterExprMap;
  labels: ILabelsFilterExprMap;
}

export interface IResultExprMap {
  limit: ResultExprFactoryFn;
  skip: ResultExprFactoryFn;
  union: ResultExprFactoryFn;
}

export type FilterRootFactoryFn = (config: any) => IStrategyFilter;

export type ResultRootFactoryFn = (config: any) => IStrategyResult;

type MatchRootFactoryFn = (q: IQueryBuilder, config: any) => IMatchAlias;

type DeleteRootFactoryFn = (q: IQueryBuilder, config: any) => IDeleteBuilder;

export interface IStrategyMap {
  delete: {
    root: DeleteRootFactoryFn;
  };
  match: {
    root: MatchRootFactoryFn;
  };
  filter: {
    root: FilterRootFactoryFn;
    exprMap: IFilterExprMap;
  };
  result: {
    root: ResultRootFactoryFn;
    exprMap: IResultExprMap;
  };
}

export interface IQueryBuilder {
  aliasMap: Props;
  strategyMap: IStrategyMap;
  mergeAliasMap(aliasMap: Props, name?: string): void;
}

export class QueryBuilder {
  strategyMap: IStrategyMap = defaultStrategyMap();
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
    return this.strategyMap.delete.root(this, this.configObj);
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
