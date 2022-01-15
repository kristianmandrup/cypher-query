import { IQueryClauses } from ".";
import { ResultController } from "..";
import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { ResultClause } from "./return-clause";

export interface IResultClauses extends IQueryClauses {
  addClause(clause: ResultClause): IResultClauses;
}

export class ResultClauses extends QueryClauses implements IResultClauses {
  controller?: ResultController;

  get map() {
    return this.controller?.map;
  }

  addClause(clause: ResultClause) {
    return super.addClause(clause);
  }

  isValid(clause: ResultClause) {
    return clause.type === ClauseType.return;
  }
}
