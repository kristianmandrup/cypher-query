import { IStrategyFilter } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { ComposeOneFilterExpr } from "../compose-one-filter-expr";

export const createNotFilterExpr = (filter: IStrategyFilter) =>
  new NotFilterExpr(filter);

export class NotFilterExpr extends ComposeOneFilterExpr {
  run(): GraphObjDef[] {
    return [];
  }
}
