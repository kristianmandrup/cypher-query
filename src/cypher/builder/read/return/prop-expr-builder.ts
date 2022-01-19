import { IReturnExprBuilder, ReturnExprBuilder } from ".";
import { IQueryBuilder } from "../..";
import { IResultClauseBuilder } from "../result/result-clause-builder";

export interface IReturnPropExprBuilder extends IReturnExprBuilder {
  // matches(expr: any): any;
}

export const createReturnPropExprBuilder = (
  cb: IResultClauseBuilder,
  config: any
) => new PropExprBuilder(cb).config(config);

export class PropExprBuilder
  extends ReturnExprBuilder
  implements IReturnPropExprBuilder
{
  exprName: string = "or";
}
