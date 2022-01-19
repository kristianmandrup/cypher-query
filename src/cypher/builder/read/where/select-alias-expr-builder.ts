import {
  IAndExprBuilder,
  INotExprBuilder,
  IOrExprBuilder,
  IWhereClauseBuilder,
  WhereExprBuilder,
} from ".";
import { IExprBuilder } from "../expr-builder";

export interface IWhereSelectAliasExprBuilder {
  get or(): IOrExprBuilder;
  get and(): IAndExprBuilder;
  get not(): INotExprBuilder;
}

export const createWhereSelectAliasExprBuilder = (
  w: IWhereClauseBuilder,
  config: any
) => new WhereSelectAliasExprBuilder(w).config(config);

export class WhereSelectAliasExprBuilder extends WhereExprBuilder {
  protected mapped(name: string): IExprBuilder {
    return (this.where as any)[name](this.clauseBuilder, this.configObj);
  }

  get or(): IOrExprBuilder {
    return this.mapped("or") as IOrExprBuilder;
  }

  get and(): IAndExprBuilder {
    return this.mapped("and") as IAndExprBuilder;
  }

  get not(): INotExprBuilder {
    return this.mapped("not") as INotExprBuilder;
  }
}
