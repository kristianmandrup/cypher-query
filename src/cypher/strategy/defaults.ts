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

export const defaultCompositeFilterMap = () => {
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
      composite: defaultCompositeFilterMap(),
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

export const defaultStrategyMap = (): IStrategyMap => {
  return {
    create: {},
    delete: {},
    match: {},
    filter: defaultFilterMap(),
    result: defaultResultMap(),
  };
};
