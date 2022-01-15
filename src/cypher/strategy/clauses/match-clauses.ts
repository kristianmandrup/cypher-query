import { MatchController } from "..";
import { ClauseType } from "../enum";
import { MatchClause } from "./match-clause";
import { IQueryClauses, QueryClauses } from "./query-clauses";

export interface IMatchClauses extends IQueryClauses {
  addClause(clause: MatchClause): IMatchClauses;
}

export class MatchClauses extends QueryClauses implements IMatchClauses {
  controller?: MatchController;

  get map() {
    return this.controller?.map;
  }

  addClause(clause: MatchClause) {
    return super.addClause(clause);
  }

  isValid(clause: MatchClause) {
    return clause.type === ClauseType.match;
  }
}
