import { Handler, IQueryBuilder } from "..";
import { IStrategyResult } from "../../cypher-types";

export interface IExprBuilder {
  result?: IStrategyResult;
}

export class ExprBuilder extends Handler implements IExprBuilder {
  q: IQueryBuilder;
  result?: IStrategyResult;

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  config(config: any) {
    return this;
  }
}
