import { IReturnClauses, ReturnClauses } from "../clauses";
import { BaseController } from "./base-controller";

export interface IReturnController {
  clauses: IReturnClauses;
}

export class ReturnController
  extends BaseController
  implements IReturnController
{
  clauses: IReturnClauses = new ReturnClauses(this.strategy).setController(
    this
  );

  get map() {
    return this.strategyMap.return;
  }
}
