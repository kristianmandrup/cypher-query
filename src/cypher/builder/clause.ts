import { Props } from "../cypher-types";
import { IQueryBuilder } from "./builder";
import { Handler } from "./handler";

export class BuilderClause extends Handler {
  q: IQueryBuilder;

  constructor(q: IQueryBuilder) {
    super();
    this.q = q;
  }

  config(config: any) {
    return this;
  }

  firstFromMap(map: Props) {
    return map.values()[0];
  }

  get aliasMap() {
    return this.q.aliasMap;
  }

  error(...msg: any[]) {
    console.log(...msg);
  }

  mergeAliasMap(aliasMap: Props, name?: string) {
    return this.q.mergeAliasMap(aliasMap, name);
  }
}
