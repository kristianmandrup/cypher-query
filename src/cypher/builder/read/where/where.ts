import { Clause } from "../../clause";
import { AndExpr, NotExpr, OrExpr } from "./boolean";

export type NodeMatchFn = (node: any) => boolean;

export class Where extends Clause {
  nodeMatches(fn: NodeMatchFn) {}

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
