import { ReturnClause } from "./return-clause";

export class SkipBuilder extends ReturnClause {
  number(num: number) {
    if (!this.result) {
      this.error("Missing results to skip");
      return;
    }
    // this.result.addExpr();
    return this;
  }
}
