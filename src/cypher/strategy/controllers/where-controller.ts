import { IWhereClauses, WhereClauses } from "../clauses";

export interface IWhereController {
  clauses: IWhereClauses;
}

export class WhereController implements IWhereController {
  clauses: IWhereClauses = new WhereClauses();
}
