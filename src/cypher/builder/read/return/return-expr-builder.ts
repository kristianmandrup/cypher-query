import { IClauseBuilder } from "../../clause-builder";
import { ReturnBuilderMap } from "../../map";
import { ExprBuilder } from "../expr-builder";

export interface IReturnExprBuilder {}

export class ReturnExprBuilder extends ExprBuilder {
  clauseBuilder: IClauseBuilder;
  clauseName: string = "return";

  constructor(clauseBuilder: IClauseBuilder) {
    super(clauseBuilder.queryBuilder);
    this.clauseBuilder = clauseBuilder;
  }

  get return(): ReturnBuilderMap {
    return this.clauseBuilder.builderMap.return;
  }

  returns(expr: any) {
    return this;
  }
}
