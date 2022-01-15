import { IResultClauses, ResultClauses } from "../clauses";
import { BaseController } from "./base-controller";

export interface IResultController {
  clauses: IResultClauses;
}

export class ResultController
  extends BaseController
  implements IResultController
{
  clauses: IResultClauses = new ResultClauses(this.strategy).setController(
    this
  );

  get map() {
    return this.strategyMap.return;
  }
}
