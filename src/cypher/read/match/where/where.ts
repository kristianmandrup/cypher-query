import { Clause } from "../../../clause";
import { AndExpr, NotExpr, OrExpr } from "./boolean";

export type NodeMatchFn = (node: any) => boolean;

export class Where extends Clause {
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
