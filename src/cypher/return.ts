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
}
