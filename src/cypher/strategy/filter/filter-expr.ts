import { NodeCompareConfigObj } from ".";
import { IStrategyFilter } from "..";
import { Handler } from "../../builder/handler";
import { GraphObjDef } from "../../cypher-types";
import { IAliasedFilter } from "./alias-filter";

export type NodeMatchFn = (obj: NodeCompareConfigObj) => boolean;

export interface IFilterResult {
  [key: string]: GraphObjDef[];
}

export interface IFilterExpr {
  results: GraphObjDef[];
  run(): GraphObjDef[];
  isTrue(): boolean;
}

export abstract class FilterExpr extends Handler {
  filter: IAliasedFilter;
  alias: string;
  node?: any;
  aliasKey: string = "_";
  results: GraphObjDef[] = [];

  constructor(filter: IAliasedFilter, config?: { alias: string }) {
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

  isTrue(): boolean {
    return !!this.results.length;
  }

  isValid() {
    return this.node;
  }

  isDefined(value: any) {
    return value !== undefined && value !== null;
  }

  run(): GraphObjDef[] {
    return [];
  }
}
