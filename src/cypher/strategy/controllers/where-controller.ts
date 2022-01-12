import { IWhereClauses, WhereClauses } from "../clauses";
import { BaseController, IBaseController } from "./base-controller";

export interface IWhereController extends IBaseController {
  clauses: IWhereClauses;
}

export class WhereController
  extends BaseController
  implements IWhereController
{
  clauses: IWhereClauses = new WhereClauses();
}
