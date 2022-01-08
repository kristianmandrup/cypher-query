import {
  createAndExprBuilder,
  createCreateBuilder,
  createDeleteBuilder,
  createMatchBuilder,
  createNotExprBuilder,
  createOrExprBuilder,
  createReturnBuilder,
  createWhereBuilder,
  ICreateBuilder,
  IDeleteBuilder,
  IMatchBuilder,
  IQueryBuilder,
} from ".";

type DeleteRootFactoryFn = (q: IQueryBuilder, config: any) => IDeleteBuilder;

type CreateRootFactoryFn = (q: IQueryBuilder, config: any) => ICreateBuilder;

type MatchBuilderRootFactoryFn = (
  q: IQueryBuilder,
  config: any
) => IMatchBuilder;

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
  where: any;
  return: any;
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
    // skip: createSkipExprBuilder,
    // limit: createLimitExprBuilder,
    // union: createUnionExprBuilder,
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
