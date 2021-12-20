import { Where } from "../where";

export class BaseExpr {
  whereExpr: Where;

  constructor(whereExpr: Where) {
    this.whereExpr = whereExpr;
  }
}
