import { IGraphApi } from "../../..";
import { IFilterResult } from "./filter-expr";
import { NodePropCompareExpr } from "./node-prop-compare-expr";

export type NodeCompareConfigObj = {
  node: any;
  propName: string;
  propValue: any;
};

export const createNodePropEqlExpr =
  (api: IGraphApi) => (configObj: NodeCompareConfigObj) =>
    new NodePropEqlExpr(api).config(configObj);

export class NodePropEqlExpr extends NodePropCompareExpr {
  config(configObj: NodeCompareConfigObj) {
    this.setNode(configObj.node);
    this.setPropName(configObj.propName);
    return this;
  }

  run(): void | IFilterResult {
    if (!this.isValid()) {
      return this.results;
    }
    return this.nodeMatches(
      (obj: NodeCompareConfigObj) =>
        this.propValue(obj.node, obj.propName) === obj.propValue
    );
  }
}
