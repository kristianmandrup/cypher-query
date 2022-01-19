import { IWhereClauseBuilder } from "..";
import { IFilterExpr } from "../../../..";
import {
  BooleanExprBuilder,
  IBooleanExprBuilder,
} from "./boolean-expr-builder";

export interface IAndExprBuilder extends IBooleanExprBuilder {}

export const createAndExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new AndExprBuilder(w, config);

export class AndExprBuilder extends BooleanExprBuilder {
  exprName: string = "and";

  constructor(w: IWhereClauseBuilder, config: any = {}) {
    super(w, config);
  }
}
