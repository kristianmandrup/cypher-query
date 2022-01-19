import { Handler, IQueryBuilder } from "..";

export interface IExprBuilder {}

export class ExprBuilder extends Handler implements IExprBuilder {
  q: IQueryBuilder;

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  config(config: any) {
    return this;
  }
}
