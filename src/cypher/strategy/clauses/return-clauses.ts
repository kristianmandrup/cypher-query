import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { ReturnClause } from "./return-clause";

export interface IReturnClauses {
  addClause(clause: ReturnClause): IReturnClauses;
}

export class ReturnClauses extends QueryClauses implements IReturnClauses {
  addClause(clause: ReturnClause) {
    return super.addClause(clause);
  }

  isValid(clause: ReturnClause) {
    return clause.type === ClauseType.return;
  }
}
