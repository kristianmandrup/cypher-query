import { IQueryClauses } from ".";
import { IAliasFilterExpr, IFilterExpr } from "..";
import { ClauseType, WhereFilterType } from "../enum";
import { StrategyHandler } from "../strategy-handler";

export interface IQueryClause {
  subtype: WhereFilterType;
  type: ClauseType;
  current: IFilterExpr;
  latestExpr: IFilterExpr;

  setContainer(container: IQueryClauses): IQueryClause;
  createExpression(key: string, config: any): IFilterExpr | undefined;
  addAsExpression(key: string, config: any): IQueryClause;
  addExpressions(...expressions: IFilterExpr[]): IQueryClause;
  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr): IQueryClause;
  findMatchingMapKey(key: string): any;
  findExprMapForKey(key: string): any;
}

export class QueryClause extends StrategyHandler implements IQueryClause {
  container?: IQueryClauses;
  expressions: IFilterExpr[] = [];
  aliasFilterExpr?: IAliasFilterExpr;

  get exprMapKeys(): string[] {
    return [];
  }

  get map() {
    return this.container?.map;
  }

  get current(): IFilterExpr {
    return this.expressions[this.expressions.length - 1];
  }

  get latestExpr(): IFilterExpr {
    return this.current;
  }

  setContainer(container: IQueryClauses) {
    this.container = container;
    return this;
  }

  addAsExpression(key: string, config: any): IQueryClause {
    const expr = this.createExpression(key, config);
    expr && this.addExpressions(expr);
    return this;
  }

  findMatchingMapKey(key: string): string | undefined {
    return this.exprMapKeys.find(
      (item: string) => this.map[item] && this.map[item][key]
    );
  }

  findExprMapForKey(key: string): any {
    const matchingMapKey = this.findMatchingMapKey(key);
    return matchingMapKey ? this.map[matchingMapKey] : this.map;
  }

  createExpression(key: string, config: any): IFilterExpr | undefined {
    const exprMap = this.findExprMapForKey(key);
    const createExprFn = exprMap[key];
    if (!createExprFn) {
      this.error(`No matching expression found for ${key}`);
      return;
    }
    return createExprFn(config);
  }

  addExpressions(...expressions: IFilterExpr[]) {
    this.expressions.push(...expressions);
    return this;
  }

  setAliasFilterExpr(aliasFilterExpr: IAliasFilterExpr) {
    this.aliasFilterExpr = aliasFilterExpr;
    return this;
  }

  subtype: WhereFilterType = WhereFilterType.none;

  error(msg: string) {
    throw new Error(msg);
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
