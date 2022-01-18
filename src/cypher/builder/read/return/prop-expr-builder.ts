import { IReturnExprBuilder, ResultNumberExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { NumberExprBuilder } from "../generic";

export const createReturnPropExprBuilder = (
  q: IQueryBuilder,
  config: any
): IReturnExprBuilder => new PropExprBuilder(q).config(config);

export interface IPropExprBuilder extends IReturnExprBuilder {
  sum(): IReturnExprBuilder;
  avg(): IReturnExprBuilder;
}

export class PropExprBuilder extends NumberExprBuilder {
  name() {
    return this;
  }
}
