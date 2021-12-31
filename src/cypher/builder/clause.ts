import { Props } from "../cypher-types";
import { IQueryBuilder } from "./builder";

export class Clause {
  q: IQueryBuilder;

  constructor(q: IQueryBuilder) {
    this.q = q;
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
