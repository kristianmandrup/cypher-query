import { IWhereClause } from ".";
import { WhereController } from "..";
import { ClauseType } from "../enum";
import { IQueryClauses, QueryClauses } from "./query-clauses";
import { WhereClause } from "./where-clause";

export interface IWhereClauses extends IQueryClauses {
  addClause(clause: IWhereClause): IWhereClauses;
}

export class WhereClauses extends QueryClauses implements IWhereClauses {
  controller?: WhereController;

  get map() {
    return this.controller?.map;
  }

  get exprMapKeys(): string[] {
    return ["boolean", "labels", "props"];
  }

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
