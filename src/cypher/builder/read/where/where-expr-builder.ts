import { IWhereClauseBuilder } from ".";
import { IClauseBuilder } from "../../clause-builder";
import { WhereBuilderMap } from "../../map";
import { ExprBuilder, IExprBuilder } from "../expr-builder";

export interface IWhereExprBuilder extends IExprBuilder {
  clauseBuilder: IClauseBuilder;
  matches(expr: any): any;
}

export class WhereExprBuilder extends ExprBuilder implements IWhereExprBuilder {
  clauseBuilder: IWhereClauseBuilder;
  clauseName: string = "where";

  constructor(clauseBuilder: IWhereClauseBuilder) {
    super(clauseBuilder.queryBuilder);
    this.clauseBuilder = clauseBuilder;
  }

  get where(): WhereBuilderMap {
    return this.clauseBuilder.builderMap.where;
  }

  matches(expr: any) {
    return this;
  }
}
