import {
  createAndExprBuilder,
  createCreateBuilder,
  createDeleteBuilder,
  createMatchBuilder,
  createNotExprBuilder,
  createOrExprBuilder,
  createReturnBuilder,
  createReturnCountExprBuilder,
  createSkipExprBuilder,
  createUnionExprBuilder,
  createWhereBuilder,
  createŸLimitExprBuilder,
  ICreateBuilder,
  IDeleteBuilder,
  IMatchClauseBuilder,
  IQueryBuilder,
  IResultExprBuilder,
  IReturnExprBuilder,
  IWhereClauseBuilder,
} from ".";
import { ClauseBuilder } from "./clause";
import { BaseExprBuilder } from "./read/where/boolean/boolean-expr-builder";

type DeleteRootFactoryFn = (q: IQueryBuilder, config: any) => IDeleteBuilder;

type CreateRootFactoryFn = (q: IQueryBuilder, config: any) => ICreateBuilder;

type MatchBuilderRootFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IMatchClauseBuilder;

export type ResultBuilderFn = (
  q: IQueryBuilder,
  config: any
) => IResultExprBuilder;

export type ReturnBuilderFn = (
  q: IQueryBuilder,
  config: any
) => IReturnExprBuilder;

export type WhereBuilderFn = (
  w: IWhereClauseBuilder,
  config: any
) => BaseExprBuilder;

export interface ReturnBuilderMap {
  root?: ReturnBuilderFn;
  count: ReturnBuilderFn;
  aggregation?: ReturnBuilderFn;
  prop?: ReturnBuilderFn;
  alias?: ReturnBuilderFn;
}

export interface ResultBuilderMap {
  root?: ResultBuilderFn;
  skip: ResultBuilderFn;
  limit: ResultBuilderFn;
  union?: ResultBuilderFn;
}

export type WhereRootBuilderFn = (
  q: IQueryBuilder,
  config: any
) => IWhereClauseBuilder;

export interface WhereBuilderMap {
  root: WhereRootBuilderFn;
  or: WhereBuilderFn;
  and: WhereBuilderFn;
  not: WhereBuilderFn;
}

export interface IBuilderMap {
  create: {
    root: CreateRootFactoryFn;
  };
  delete: {
    root: DeleteRootFactoryFn;
  };
  match: {
    root: MatchBuilderRootFactoryFn;
  };
  where: WhereBuilderMap;
  return: ReturnBuilderMap;
  result: ResultBuilderMap;
}

const defaultWhereMap = () => {
  return {
    root: createWhereBuilder,
    or: createOrExprBuilder,
    and: createAndExprBuilder,
    not: createNotExprBuilder,
  };
};

const defaultResultMap = () => {
  return {
    root: createReturnBuilder,
    skip: createSkipExprBuilder,
    limit: createŸLimitExprBuilder,
    union: createUnionExprBuilder,
  };
};

const defaultReturnMap = () => {
  return {
    count: createReturnCountExprBuilder,
    // aggregation: createReturnAggregationExprBuilder,
    // prop: createReturnAliasPropExprBuilder,
  };
};

export const defaultBuilderMap = (): IBuilderMap => {
  return {
    create: {
      root: createCreateBuilder,
    },
    delete: {
      root: createDeleteBuilder,
    },
    match: {
      root: createMatchBuilder,
    },
    where: defaultWhereMap(),
    return: defaultReturnMap(),
    result: defaultResultMap(),
  };
};
