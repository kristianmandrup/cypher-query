import { IMatchClauses, MatchClauses } from "../clauses";

export interface IMatchController {
  clauses: IMatchClauses;
}

export class MatchController implements IMatchController {
  clauses: IMatchClauses = new MatchClauses();
}
