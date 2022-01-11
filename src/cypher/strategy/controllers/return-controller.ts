import { IReturnClauses, ReturnClauses } from "../clauses";

export interface IReturnController {
  clauses: IReturnClauses;
}

export class ReturnController implements IReturnController {
  clauses: IReturnClauses = new ReturnClauses();
}
