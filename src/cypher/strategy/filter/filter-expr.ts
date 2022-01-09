import { NodeCompareConfigObj } from ".";
import { IGraphObjApi } from "../../../adapters";
import { Handler } from "../../builder/handler";
import { GraphObjDef } from "../../cypher-types";
import { IAliasFilterExpr } from "./alias-filter";

export type NodeMatchFn = (obj: any, config: NodeCompareConfigObj) => boolean;

export interface IFilterResult {
  [key: string]: GraphObjDef[];
}

export interface IFilterExpr {
  results: GraphObjDef[];
  run(obj: any): GraphObjDef | undefined;
  runAll(objs: GraphObjDef[]): GraphObjDef[];
  isTrue(): boolean;
}

export abstract class FilterExpr extends Handler {
  filter?: IAliasFilterExpr;
  alias: string;
  node?: any;
  aliasKey: string = "_";
  matchedResults: GraphObjDef[] = []; // default objects to filter
  results: GraphObjDef[] = [];

  constructor(config?: { alias: string }) {
    super();
    this.alias = config ? config.alias : "_";
  }

  setAliasedFilter(filter: IAliasFilterExpr) {
    this.filter = filter;
    return this;
  }

  get graphObjApi(): IGraphObjApi | undefined {
    return this.filter && this.filter.graphObjApi;
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
    return this.graphObjApi && this.graphObjApi.propValue(obj, propName);
  }

  nodeLabels(obj: any) {
    return this.graphObjApi ? this.graphObjApi.nodeLabels(obj) : [];
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

  runAll(objs: GraphObjDef[]): GraphObjDef[] {
    return objs.reduce((acc: GraphObjDef[], obj) => {
      const result = this.run(obj);
      if (result) {
        acc.push(result);
      }
      return acc;
    }, []);
  }

  run(obj: any): GraphObjDef | undefined {
    return obj;
  }
}
