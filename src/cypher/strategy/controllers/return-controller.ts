import { IAliasFilterExpr } from "..";

export interface IReturnController {
  expressions: IAliasFilterExpr[];
}

export class ReturnController implements IReturnController {
  expressions: IAliasFilterExpr[] = [];
}
