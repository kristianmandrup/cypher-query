import { ClauseType } from "../enum";
import { MatchClause } from "./match-clause";
import { QueryClauses } from "./query-clauses";

export interface IMatchClauses {
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
