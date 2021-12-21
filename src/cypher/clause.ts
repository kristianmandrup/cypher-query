import { Query } from ".";
import { Props } from "..";

export class Clause {
  q: Query;

  constructor(q: Query) {
    this.q = q;
  }

  get results() {
    return this.q.results;
  }

  propValue(node: any, propName: string) {
    return node["__props"][propName];
  }

  get ctx() {
    return this.q.ctx;
  }

  get aliasMap() {
    return this.q.aliasMap;
  }

  error(...msg: any[]) {
    console.log(...msg);
  }

  mergeAliasMap(aliasMap: Props, name?: string) {
    this.q.mergeAliasMap(aliasMap, name);
  }
}
