import { IGraphApi } from "../../..";

export type NodeMatchFn = (node: any) => boolean;

export interface IFilterResult {
  [key: string]: any[];
}

export class FilterExpr {
  api: IGraphApi;
  node?: any;
  results: IFilterResult = {};

  constructor(api: IGraphApi) {
    this.api = api;
  }

  setNode(node: any) {
    this.node = node;
    return this;
  }

  nodeMatches(fn: NodeMatchFn) {}

  propValue(node: any, propName: string) {
    return this.api.propValue(node, propName);
  }

  isValid() {
    return this.node;
  }

  isDefined(value: any) {
    return value !== undefined && value !== null;
  }
}
