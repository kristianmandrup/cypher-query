import { ClauseType } from "../enum";
import { MatchClause } from "./match-clause";
import { QueryClauses } from "./query-clauses";

export class MatchClauses extends QueryClauses {
  addClause(clause: MatchClause) {
    return super.addClause(clause);
  }

  isValid(clause: MatchClause) {
    return clause.type === ClauseType.match;
  }
}
