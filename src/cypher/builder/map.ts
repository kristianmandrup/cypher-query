import {
  createAndExprBuilder,
  createCreateBuilder,
  createDeleteBuilder,
  createMatchBuilder,
  createNotExprBuilder,
  createOrExprBuilder,
  createReturnBuilder,
  createSkipExprBuilder,
  createUnionExprBuilder,
  createWhereBuilder,
  createŸLimitExprBuilder,
  ICreateBuilder,
  IDeleteBuilder,
  IMatchBuilder,
  IQueryBuilder,
  IWhereBuilder,
} from ".";
import { BuilderClause } from "./clause";
import { BaseExprBuilder } from "./read/where/boolean/base-expr";

type DeleteRootFactoryFn = (q: IQueryBuilder, config: any) => IDeleteBuilder;

type CreateRootFactoryFn = (q: IQueryBuilder, config: any) => ICreateBuilder;

type MatchBuilderRootFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IMatchBuilder;

export type ReturnBuilderFn = (q: IQueryBuilder, config: any) => BuilderClause;
export type WhereBuilderFn = (w: IWhereBuilder, config: any) => BaseExprBuilder;

export interface ReturnBuilderMap {
  root: ReturnBuilderFn;
  skip: ReturnBuilderFn;
  limit: ReturnBuilderFn;
  union: ReturnBuilderFn;
}

export type WhereRootBuilderFn = (
  q: IQueryBuilder,
  config: any
) => IWhereBuilder;

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
}

const defaultWhereMap = () => {
  return {
    root: createWhereBuilder,
    or: createOrExprBuilder,
    and: createAndExprBuilder,
    not: createNotExprBuilder,
  };
};

const defaultReturnMap = () => {
  return {
    root: createReturnBuilder,
    skip: createSkipExprBuilder,
    limit: createŸLimitExprBuilder,
    union: createUnionExprBuilder,
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
  };
};
