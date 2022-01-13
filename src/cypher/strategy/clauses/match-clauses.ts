import { ClauseType } from "../enum";
import { MatchClause } from "./match-clause";
import { IQueryClauses, QueryClauses } from "./query-clauses";

export interface IMatchClauses extends IQueryClauses {
  addClause(clause: MatchClause): IMatchClauses;
}

export class MatchClauses extends QueryClauses implements IMatchClauses {
  addClause(clause: MatchClause) {
    return super.addClause(clause);
  }

  isValid(clause: MatchClause) {
    return clause.type === ClauseType.match;
  }
}
