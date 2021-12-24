import { ResultExpr } from ".";
import { GraphObjDef } from "../../cypher-types";

export class StrategyResult {
  filtered: GraphObjDef[] = [];
  expressions: ResultExpr[] = [];

  setFiltered(filtered: GraphObjDef[]) {
    this.filtered = filtered;
    return this;
  }

  addExpr(expr: ResultExpr) {
    this.expressions.push(expr);
    return this;
  }
}
