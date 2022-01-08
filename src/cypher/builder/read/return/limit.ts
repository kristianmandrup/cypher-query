import { ReturnClause } from "./return-clause";

export class LimitBuilder extends ReturnClause {
  number(num: number) {
    if (!this.result) {
      this.error("Missing results to limit");
      return;
    }
    // this.result.addExpr(createLimitExpr(num));
    return this;
  }
}
