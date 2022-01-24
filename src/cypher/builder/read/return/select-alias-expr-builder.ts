import {
  IReturnClauseBuilder,
  IReturnPropExprBuilder,
  ReturnExprBuilder,
} from ".";
import { IExprBuilder } from "../expr-builder";

export interface IReturnSelectAliasExprBuilder {
  get prop(): IReturnPropExprBuilder;
}

export const createWhereSelectAliasExprBuilder = (
  cb: IReturnClauseBuilder,
  config: any
) => new ReturnSelectAliasExprBuilder(cb).config(config);

export class ReturnSelectAliasExprBuilder extends ReturnExprBuilder {
  protected mapped(name: string): IExprBuilder {
    return (this.return as any)[name](this.clauseBuilder, this.configObj);
  }

  get prop(): IReturnPropExprBuilder {
    return this.mapped("prop") as IReturnPropExprBuilder;
  }
}
