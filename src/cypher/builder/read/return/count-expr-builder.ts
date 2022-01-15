import { ReturnNumberExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { IReturnNumberExprBuilder } from "../result/result-number-expr-builder";

export const createCountBuilder = (q: IQueryBuilder, config: any) =>
  new CountExprBuilder(q).config(config);

export interface ICountExprBuilder extends IReturnNumberExprBuilder {}

export class CountExprBuilder extends ReturnNumberExprBuilder {
  $distinct = false;

  distinct() {
    this.$distinct = true;
    return this;
  }
}
