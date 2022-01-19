import {
  createAndExprBuilder,
  createCreateBuilder,
  createDeleteBuilder,
  createLabelExprBuilder,
  createLimitExprBuilder,
  createMatchClauseBuilder,
  createNotExprBuilder,
  createOrExprBuilder,
  createPropExprBuilder,
  createReturnCountExprBuilder,
  createReturnPropExprBuilder,
  createSkipExprBuilder,
  createUnionExprBuilder,
  createWhereBuilder,
  ICreateBuilder,
  IDeleteBuilder,
  IMatchClauseBuilder,
  IQueryBuilder,
  IResultExprBuilder,
  IReturnExprBuilder,
  IWhereClauseBuilder,
  WhereExprBuilder,
} from ".";
import { IMatchExprBuilder } from "./read/match/match-expr-builder";
import {
  createResultClauseBuilder,
  IResultClauseBuilder,
} from "./read/result/result-clause-builder";
import { createReturnAggregationExprBuilder } from "./read/return/aggregation-expr-builder";
import {
  createReturnClauseBuilder,
  IReturnClauseBuilder,
} from "./read/return/return-clause-builder";
import {
  createWhereSelectAliasExprBuilder,
  IWhereSelectAliasExprBuilder,
} from "./read/where/select-alias-expr-builder";

export type DeleteClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IDeleteBuilder;

export type CreateClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => ICreateBuilder;

export type MatchClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IMatchClauseBuilder;

export type ResultClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IResultClauseBuilder;

export type ReturnClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IReturnClauseBuilder;

export type MatchExprBuilderFn = (
  cb: IMatchClauseBuilder,
  config: any
) => IMatchExprBuilder;

export type ResultExprBuilderFn = (
  cb: IResultClauseBuilder,
  config: any
) => IResultExprBuilder;

export type ReturnExprBuilderFn = (
  cb: IReturnClauseBuilder,
  config: any
) => IReturnExprBuilder;

export type WhereExprBuilderFn = (
  w: IWhereClauseBuilder,
  config: any
) => WhereExprBuilder;

export interface ReturnBuilderMap {
  root: ReturnClauseBuilderFactoryFn;
  count: ReturnExprBuilderFn;
  aggregation: ReturnExprBuilderFn;
  prop: ReturnExprBuilderFn;
  // alias?: ReturnBuilderFn;
}

export interface ResultBuilderMap {
  root: ResultClauseBuilderFactoryFn;
  skip: ResultExprBuilderFn;
  limit: ResultExprBuilderFn;
  // union?: ResultBuilderFn;
}

export type WhereClauseBuilderFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IWhereClauseBuilder;

export type WhereSelectAliasBuilderFn = (
  w: IWhereClauseBuilder,
  config: any
) => IWhereSelectAliasExprBuilder;

export interface WhereBuilderMap {
  root: WhereClauseBuilderFactoryFn;
  obj: WhereSelectAliasBuilderFn;
  or: WhereExprBuilderFn;
  and: WhereExprBuilderFn;
  not: WhereExprBuilderFn;
  label: WhereExprBuilderFn;
  prop: WhereExprBuilderFn;
}

export interface IBuilderMap {
  create: {
    root: CreateClauseBuilderFactoryFn;
  };
  delete: {
    root: DeleteClauseBuilderFactoryFn;
  };
  match: {
    root: MatchClauseBuilderFactoryFn;
  };
  where: WhereBuilderMap;
  return: ReturnBuilderMap;
  result: ResultBuilderMap;
}

const defaultWhereMap = () => {
  return {
    root: createWhereBuilder,
    obj: createWhereSelectAliasExprBuilder,
    or: createOrExprBuilder,
    and: createAndExprBuilder,
    not: createNotExprBuilder,
    label: createLabelExprBuilder,
    prop: createPropExprBuilder,
  };
};

const defaultResultMap = () => {
  return {
    root: createResultClauseBuilder,
    skip: createSkipExprBuilder,
    limit: createLimitExprBuilder,
    union: createUnionExprBuilder,
  };
};

const defaultReturnMap = () => {
  return {
    root: createReturnClauseBuilder,
    count: createReturnCountExprBuilder,
    aggregation: createReturnAggregationExprBuilder,
    prop: createReturnPropExprBuilder,
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
      root: createMatchClauseBuilder,
    },
    where: defaultWhereMap(),
    return: defaultReturnMap(),
    result: defaultResultMap(),
  };
};
