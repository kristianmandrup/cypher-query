import { IClauseBuilder } from "../../clause-builder";
import { ExprBuilder } from "../expr-builder";

export interface IResultExprBuilder {}

export class ResultExprBuilder extends ExprBuilder {
  clauseBuilder: IClauseBuilder;
  clauseName: string = "result";

  constructor(clauseBuilder: IClauseBuilder) {
    super(clauseBuilder.queryBuilder);
    this.clauseBuilder = clauseBuilder;
  }
}
