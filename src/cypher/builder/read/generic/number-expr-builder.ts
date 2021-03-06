import { IClauseBuilder } from "../../clause-builder";
import { ExprBuilder, IExprBuilder } from "../expr-builder";

export interface INumberExprBuilder extends IExprBuilder {
  number(num: number): INumberExprBuilder;
}

export class NumberExprBuilder extends ExprBuilder {
  constructor(clauseBuilder: IClauseBuilder) {
    super(clauseBuilder.queryBuilder);
    this.clauseBuilder = clauseBuilder;
  }

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
