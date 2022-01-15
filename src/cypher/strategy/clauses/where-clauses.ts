import { IWhereClause } from ".";
import { ClauseType } from "../enum";
import { IQueryClauses, QueryClauses } from "./query-clauses";
import { WhereClause } from "./where-clause";

export interface IWhereClauses extends IQueryClauses {
  addClause(clause: IWhereClause): IWhereClauses;
}

export class WhereClauses extends QueryClauses implements IWhereClauses {
  addClause(clause: IWhereClause) {
    return super.addClause(clause);
  }

  isValid(clause: IWhereClause) {
    return clause.type === ClauseType.where;
  }

  get optional(): IWhereClause[] {
    return this.list.filter((item) => (item as WhereClause).isOptional());
  }

  get must(): IWhereClause[] {
    return this.list.filter((item) => !(item as WhereClause).isOptional());
  }
}
