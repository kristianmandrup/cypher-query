import { IClauseBuilder } from "../../clause-builder";
import { ExprBuilder } from "../expr-builder";

export interface IReturnExprBuilder {}

export class ReturnExprBuilder extends ExprBuilder {
  clauseBuilder: IClauseBuilder;
  clauseName: string = "return";

  constructor(clauseBuilder: IClauseBuilder) {
    super(clauseBuilder.queryBuilder);
    this.clauseBuilder = clauseBuilder;
  }

  returns(expr: any) {
    return this;
  }
}
