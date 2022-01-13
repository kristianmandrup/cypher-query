import { IStrategyResult } from "../../../cypher-types";
import { ExprBuilder } from "../expr-builder";

export interface IReturnExprBuilder {
  result?: IStrategyResult;
}

export class ReturnExprBuilder extends ExprBuilder {}
