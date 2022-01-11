import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { ReturnClause } from "./return-clause";

export class ReturnClauses extends QueryClauses {
  addClause(clause: ReturnClause) {
    return super.addClause(clause);
  }

  isValid(clause: ReturnClause) {
    return clause.type === ClauseType.return;
  }
}
