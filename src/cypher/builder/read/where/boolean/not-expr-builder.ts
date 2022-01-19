import { IWhereClauseBuilder } from "..";
import {
  BooleanExprBuilder,
  IBooleanExprBuilder,
} from "./boolean-expr-builder";

export interface INotExprBuilder extends IBooleanExprBuilder {}

export const createNotExprBuilder = (w: IWhereClauseBuilder, config: any) =>
  new NotExprBuilder(w, config);

export class NotExprBuilder extends BooleanExprBuilder {
  exprName: string = "not";
}
