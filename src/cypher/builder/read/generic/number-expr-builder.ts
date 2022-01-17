import { ExprBuilder } from "../expr-builder";

export class NumberExprBuilder extends ExprBuilder {
  protected isValidNumber(num: number) {
    return num && num >= 0;
  }

  number(num: number) {
    if (!this.isValidNumber(num)) {
      this.error("Invalid number");
      return;
    }
    return this;
  }
}
