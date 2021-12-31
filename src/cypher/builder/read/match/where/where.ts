import { GraphObjDef } from "../../../../cypher-types";
import { Clause } from "../../../clause";
import { AndExpr, NotExpr, OrExpr } from "./boolean";

export type NodeMatchFn = (node: any) => boolean;

export class Where extends Clause {
  pattern(...graphObjs: GraphObjDef[]) {
    let objType = "";
    const map = graphObjs.reduce((acc, obj) => {
      if (objType && obj.type === objType) {
        const nextType = objType === "edge" ? "node" : "edge";
        throw new Error(`Invalid object in this position, must be ${nextType}`);
      }
      // ...
      objType = obj.type || "";
      return acc;
    }, {});
    return map;
  }

  nodeMatches(fn: NodeMatchFn) {}

  nodePropEql(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) === propValue
    );
  }

  nodePropNotEql(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) !== propValue
    );
  }

  nodePropLt(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) < propValue
    );
  }

  nodePropLte(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) <= propValue
    );
  }

  nodePropGt(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) > propValue
    );
  }

  nodePropGte(node: any, propName: string, propValue: any) {
    return this.nodeMatches(
      (node) => this.propValue(node, propName) >= propValue
    );
  }

  get or() {
    return new OrExpr(this);
  }

  get and() {
    return new AndExpr(this);
  }

  get not() {
    return new NotExpr(this);
  }
}
