import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { WhereClause } from "./where-clause";

export class WhereClauses extends QueryClauses {
  addClause(clause: WhereClause) {
    return super.addClause(clause);
  }

  isValid(clause: WhereClause) {
    return clause.type === ClauseType.where;
  }
}
