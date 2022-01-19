import { IReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ClauseBuilder, IClauseBuilder } from "../../clause-builder";

export const createReturnClauseBuilder = (q: IQueryBuilder, config: any) =>
  new ReturnClauseBuilder(q).config(config);

export interface IReturnClauseBuilder extends IClauseBuilder {
  aggregate(config: any): IReturnExprBuilder;
}

export class ReturnClauseBuilder
  extends ClauseBuilder
  implements IReturnClauseBuilder
{
  aggregate(config: any = {}): IReturnExprBuilder {
    return this.builderMap.return.aggregation(this, config);
  }

  prop(name: string): IReturnExprBuilder {
    return this.builderMap.return.prop(this, { name });
  }
}
