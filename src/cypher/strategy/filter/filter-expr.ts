import { NodeCompareConfigObj } from ".";
import { IGraphApi } from "../../..";
import { Handler } from "../../builder/handler";

export type NodeMatchFn = (obj: NodeCompareConfigObj) => boolean;

export interface IFilterResult {
  [key: string]: any[];
}

export class FilterExpr extends Handler {
  api: IGraphApi;
  alias: string;
  node?: any;
  results: IFilterResult = {};

  constructor(api: IGraphApi, config?: { alias: string }) {
    super();
    this.api = api;
    this.alias = config ? config.alias : "_";
  }

  setAlias(alias: string) {
    this.alias = alias;
    return this;
  }

  setNode(node: any) {
    this.node = node;
    return this;
  }

  propValue(node: any, propName: string) {
    return this.api.propValue(node, propName);
  }

  nodeLabels(node: any) {
    return this.api.nodeLabels(node);
  }

  isValid() {
    return this.node;
  }

  isDefined(value: any) {
    return value !== undefined && value !== null;
  }
}
