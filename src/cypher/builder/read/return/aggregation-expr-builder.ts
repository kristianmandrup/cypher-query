import { IReturnExprBuilder, ResultNumberExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { NumberExprBuilder } from "../generic";
import { IResultNumberExprBuilder } from "../result/result-number-expr-builder";

export const createReturnAggregationExprBuilder = (
  q: IQueryBuilder,
  config: any
): IReturnExprBuilder => new AggregationExprBuilder(q).config(config);

export interface IAggregationExprBuilder extends IReturnExprBuilder {
  sum(): IReturnExprBuilder;
  avg(): IReturnExprBuilder;
}

export class AggregationExprBuilder extends NumberExprBuilder {
  $distinct = false;

  sum() {
    return this;
  }

  avg() {
    return this;
  }
}
