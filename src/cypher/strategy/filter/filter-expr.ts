import { NodeCompareConfigObj } from ".";
import { IStrategyFilter } from "..";
import { Handler } from "../../builder/handler";
import { GraphObjDef } from "../../cypher-types";

export type NodeMatchFn = (obj: NodeCompareConfigObj) => boolean;

export interface IFilterResult {
  [key: string]: GraphObjDef[];
}

export interface IFilterExpr {
  run(): IFilterResult;
}

export abstract class FilterExpr extends Handler {
  filter: IStrategyFilter;
  alias: string;
  node?: any;
  results: IFilterResult = {};

  constructor(filter: IStrategyFilter, config?: { alias: string }) {
    super();
    this.filter = filter;
    this.alias = config ? config.alias : "_";
  }

  get graphObjApi() {
    return this.filter.graphObjApi;
  }

  setAlias(alias: string) {
    this.alias = alias;
    return this;
  }

  setNode(node: any) {
    this.node = node;
    return this;
  }

  propValue(obj: any, propName: string) {
    return this.graphObjApi.propValue(obj, propName);
  }

  nodeLabels(obj: any) {
    return this.graphObjApi.nodeLabels(obj);
  }

  isValid() {
    return this.node;
  }

  isDefined(value: any) {
    return value !== undefined && value !== null;
  }

  run(): IFilterResult {
    return {};
  }
}
