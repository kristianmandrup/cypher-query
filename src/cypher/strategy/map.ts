import { IResultExpr, IStrategyResult, Props } from "../cypher-types";
import { IFilterExpr, IMatchObjExpr, IStrategyFilter } from "..";
import { defaultStrategyMap } from "./defaults";

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

type MatchRootExprFactoryFn = (config: any) => IMatchObjExpr;

interface IDeleteExpr {}
interface ICreateExpr {}

type DeleteRootExprFactoryFn = (config: any) => IDeleteExpr;

type CreateRootExprFactoryFn = (config: any) => ICreateExpr;

export interface IStrategyMap {
  create: {
    root: CreateRootExprFactoryFn;
  };
  delete: {
    root: DeleteRootExprFactoryFn;
  };
  match: {
    root: MatchRootExprFactoryFn;
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
