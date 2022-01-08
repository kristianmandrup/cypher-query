import {
  createAndFilterExpr,
  createLimitExpr,
  createNodeLabelMatchesExpr,
  createNodeLabelsIncludeExpr,
  createNodePropEqlExpr,
  createNodePropGtExpr,
  createNodePropLtExpr,
  createNotFilterExpr,
  createOrFilterExpr,
  createSkipExpr,
  createStrategyFilter,
  createStrategyResult,
  createUnionExpr,
} from ".";
import { IStrategyMap } from "./map";

export const defaultPropsFilterMap = () => {
  return {
    eq: createNodePropEqlExpr,
    lt: createNodePropLtExpr,
    gt: createNodePropGtExpr,
  };
};

export const defaultLabelsFilterMap = () => {
  return {
    match: createNodeLabelMatchesExpr,
    include: createNodeLabelsIncludeExpr,
  };
};

export const defaultBooleanFilterMap = () => {
  return {
    and: createAndFilterExpr,
    or: createOrFilterExpr,
    not: createNotFilterExpr,
  };
};

export const defaultFilterMap = () => {
  return {
    root: createStrategyFilter,
    exprMap: {
      boolean: defaultBooleanFilterMap(),
      props: defaultPropsFilterMap(),
      labels: defaultLabelsFilterMap(),
    },
  };
};

export const defaultResultMap = () => {
  return {
    root: createStrategyResult,
    exprMap: {
      limit: createLimitExpr,
      skip: createSkipExpr,
      union: createUnionExpr,
    },
  };
};

const empty: any = {};

export const defaultStrategyMap = (): IStrategyMap => {
  return {
    create: {
      root: empty,
    },
    delete: {
      root: empty,
    },
    match: {
      root: empty,
    },
    filter: defaultFilterMap(),
    result: defaultResultMap(),
  };
};
