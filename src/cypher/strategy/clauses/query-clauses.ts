import { IFilterExpr, IQueryController } from "..";
import { IBaseController } from "../controllers/base-controller";
import { ClauseType } from "../enum";
import { StrategyHandler } from "../strategy-handler";
import { IQueryClause } from "./query-clause";

export interface IQueryClauses {
  addClause(clause: IQueryClause): IQueryClauses;
  addExpressions(...expressions: IFilterExpr[]): IQueryClauses;
  current: IQueryClause;
  count: number;
  map: any;
}

export class QueryClauses extends StrategyHandler {
  list: IQueryClause[] = [];
  controller?: IBaseController;

  get map() {
    return this.controller?.map;
  }

  setController(controller: IBaseController) {
    this.controller = controller;
    return this;
  }

  get count() {
    return this.list.length;
  }

  get current(): IQueryClause {
    return this.list[this.list.length - 1];
  }

  addClause(clause: IQueryClause) {
    clause.setContainer(this);
    if (!this.isValid(clause)) {
      this.error(`addClause: Invalid ${this.typeName} clause`, clause);
      return this;
    }
    this.list.push(clause);
    return this;
  }

  addExpressions(...expressions: IFilterExpr[]) {
    this.current.addExpressions(...expressions);
    return this;
  }

  isValid(clause: IQueryClause) {
    return false;
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
