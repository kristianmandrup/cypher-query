import { Match, Where } from "./read";
import { IResultExpr, IStrategyResult, Props } from "../cypher-types";
import { Return } from "./return";
import { Create, Delete } from "./write";
import { Csv } from "./load";
import { IFilterExpr, IGraphObjApi, IStrategyFilter } from "..";
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

export interface ICompositeFilterExprMap {
  and: FilterExprFactoryFn;
  or: FilterExprFactoryFn;
  not: FilterExprFactoryFn;
}

export interface IFilterExprMap {
  composite: ICompositeFilterExprMap;
  props: IPropFilterExprMap;
  labels: ILabelsFilterExprMap;
}

export interface IResultExprMap {
  limit: ResultExprFactoryFn;
  skip: ResultExprFactoryFn;
  union: ResultExprFactoryFn;
}

export interface IStrategyMap {
  filter: {
    root: (graphObjApi: IGraphObjApi) => IStrategyFilter;
    exprMap: IFilterExprMap;
  };
  result: {
    root: (config: any) => IStrategyResult;
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
    return new Delete(this);
  }

  get match() {
    return new Match(this);
  }

  get where() {
    return new Where(this);
  }

  get return() {
    return new Return(this);
  }
}
