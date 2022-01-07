import {
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
}

export const defaultBuilderMap = (): IBuilderMap => {
  return {
    create: {},
    delete: {},
    match: {},
    filter: defaultFilterMap(),
    result: defaultReturnMap(),
  };
};
