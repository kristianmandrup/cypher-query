import { IQueryClauses } from ".";
import { ReturnController } from "..";
import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { ReturnClause } from "./return-clause";

export interface IReturnClauses extends IQueryClauses {
  addClause(clause: ReturnClause): IReturnClauses;
}

export class ReturnClauses extends QueryClauses implements IReturnClauses {
  controller?: ReturnController;

  get map() {
    return this.controller?.map;
  }

  addClause(clause: ReturnClause) {
    return super.addClause(clause);
  }

  isValid(clause: ReturnClause) {
    return clause.type === ClauseType.return;
  }
}
