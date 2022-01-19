import { IWhereClauseBuilder } from "..";
import { IWhereExprBuilder, WhereExprBuilder } from "../where-expr-builder";

export interface IBooleanExprBuilder extends IWhereExprBuilder {}

export class BooleanExprBuilder extends WhereExprBuilder {
  constructor(whereClauseBuilder: IWhereClauseBuilder, config: any) {
    super(whereClauseBuilder);
    this.setExpression(config);
  }
}
