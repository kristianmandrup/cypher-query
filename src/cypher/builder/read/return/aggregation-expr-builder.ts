import { IReturnClauseBuilder, IReturnExprBuilder } from ".";
import { NumberExprBuilder } from "../generic";

export const createReturnAggregationExprBuilder = (
  cb: IReturnClauseBuilder,
  config: any
): IReturnExprBuilder => new AggregationExprBuilder(cb).config(config);

export interface IAggregationExprBuilder extends IReturnExprBuilder {
  sum(name: string): IAggregationExprBuilder;
  avg(name: string): IAggregationExprBuilder;
}

export class AggregationExprBuilder
  extends NumberExprBuilder
  implements IAggregationExprBuilder
{
  $distinct = false;

  sum(name: string) {
    return this;
  }

  avg(name: string) {
    return this;
  }
}
