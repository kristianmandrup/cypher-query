import { Clause } from "./clause";

export class Return extends Clause {
  node(alias: string, prop?: string) {
    const node = this.aliasMap["matches"][alias];
    if (node.__type !== "node") {
      this.error(`${alias} is not a node`);
    }
    return prop ? node[prop] : node;
  }

  rel(alias: string, prop: string) {
    const rel = this.aliasMap["matches"][alias];
    if (rel.__type !== "edge") {
      this.error(`${alias} is not an edge`);
    }
    return prop ? rel[prop] : rel;
  }

  count(num: number, distinct: boolean) {}

  min(num: number, distinct: boolean) {}

  max(num: number, distinct: boolean) {}
}
