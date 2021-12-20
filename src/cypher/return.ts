import { Predicate } from "./predicate";

export class Return extends Predicate {
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
}
