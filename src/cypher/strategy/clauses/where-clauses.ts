import { IWhereClause } from ".";
import { ClauseType } from "../enum";
import { QueryClauses } from "./query-clauses";
import { WhereClause } from "./where-clause";

export interface IWhereClauses {
  addClause(clause: WhereClause): IWhereClauses;
}

export class WhereClauses extends QueryClauses implements IWhereClauses {
  addClause(clause: WhereClause) {
    return super.addClause(clause);
  }

  isValid(clause: WhereClause) {
    return clause.type === ClauseType.where;
  }

  get optional(): IWhereClause[] {
    return this.list.filter((item) => (item as WhereClause).isOptional());
  }

  get must(): IWhereClause[] {
    return this.list.filter((item) => !(item as WhereClause).isOptional());
  }
}
