import { IReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { ClauseBuilder } from "../../clause";

export const createReturnClauseBuilder = (q: IQueryBuilder, config: any) =>
  new ReturnClauseBuilder(q).config(config);

export interface IReturnClauseBuilder {
  obj(alias: string): IReturnExprBuilder;

  aggregate(config: any): IReturnExprBuilder;
}

export class ReturnClauseBuilder extends ClauseBuilder {
  aggregate(config: any = {}): IReturnExprBuilder {
    return this.builderMap.return.aggregation(this, config);
  }

  prop(name: string): IReturnExprBuilder {
    return this.builderMap.return.prop(this, { name });
  }
}
