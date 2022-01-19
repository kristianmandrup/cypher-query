import { IReturnClauseBuilder, IReturnExprBuilder } from ".";
import { NumberExprBuilder } from "../generic";

export const createReturnCountExprBuilder = (
  cb: IReturnClauseBuilder,
  config: any
): IReturnExprBuilder => new CountExprBuilder(cb).config(config);

export interface ICountExprBuilder extends IReturnExprBuilder {}

export class CountExprBuilder
  extends NumberExprBuilder
  implements ICountExprBuilder
{
  $distinct = false;

  distinct() {
    this.$distinct = true;
    return this;
  }
}
