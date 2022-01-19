import { IReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { NumberExprBuilder } from "../generic";
import { IResultNumberExprBuilder } from "../result/result-number-expr-builder";

export const createReturnCountExprBuilder = (
  q: IQueryBuilder,
  config: any
): IReturnExprBuilder => new CountExprBuilder(q).config(config);

export interface ICountExprBuilder extends IReturnExprBuilder {}

export class CountExprBuilder extends NumberExprBuilder {
  $distinct = false;

  distinct() {
    this.$distinct = true;
    return this;
  }
}
