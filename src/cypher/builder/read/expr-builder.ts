import { Handler, IQueryBuilder } from "..";

export interface IExprBuilder {
  exprName: String;
  q: IQueryBuilder;
  config(config: any): IExprBuilder;
}

export class ExprBuilder extends Handler implements IExprBuilder {
  q: IQueryBuilder;
  exprName: string = "";

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  config(config: any) {
    return this;
  }
}
