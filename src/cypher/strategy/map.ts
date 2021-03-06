import { IReturnExpr, IStrategyResult } from "../cypher-types";
import { IFilterExpr, IMatchObjExpr } from "..";
import {
  IComposeOneFilterExpr,
  ICompositeFilterExpr,
  ICypherStrategy,
} from ".";

type AndOrFilterExprFactoryFn = CompositeFilterExprFactoryFn;
type NotFilterExprFactoryFn = ComposeOneFilterExprFactoryFn;

type CompositeFilterExprFactoryFn = (config?: any) => ICompositeFilterExpr;
type ComposeOneFilterExprFactoryFn = (config?: any) => IComposeOneFilterExpr;

type FilterExprFactoryFn = (config?: any) => IFilterExpr;
type ReturnExprFactoryFn = (
  result: IStrategyResult,
  config?: any
) => IReturnExpr;

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
  and: AndOrFilterExprFactoryFn;
  or: AndOrFilterExprFactoryFn;
  not: NotFilterExprFactoryFn;
}

export interface IWhereExprMap {
  boolean: IBooleanFilterExprMap;
  props: IPropFilterExprMap;
  labels: ILabelsFilterExprMap;
}

export interface IReturnExprMap {
  limit: ReturnExprFactoryFn;
  skip: ReturnExprFactoryFn;
  union: ReturnExprFactoryFn;
}

export type StrategyRootFactoryFn = (config: any) => ICypherStrategy;

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
  where: IWhereExprMap;
  return: IReturnExprMap;
  // root: ResultRootFactoryFn;
}
