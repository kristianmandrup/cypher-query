import { IMatchClauses, MatchClauses } from "../clauses";
import { BaseController } from "./base-controller";

export interface IMatchController {
  clauses: IMatchClauses;
}

export class MatchController
  extends BaseController
  implements IMatchController
{
  clauses: IMatchClauses = new MatchClauses(this.strategy).setController(this);

  get map() {
    return this.strategyMap.match;
  }
}
