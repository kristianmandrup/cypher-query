import { ClauseBuilder } from "./clause";

export class Return extends ClauseBuilder {
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

  countNodes(alias: string, distinct: boolean) {}

  countEdges(alias: string, distinct: boolean) {}

  count(expr: any, distinct: boolean) {}

  // count(*)
  countAll() {}

  min(expr: any) {}

  max(expr: any) {}

  // numerical
  sum(expr: any) {}

  // numerical
  avg(expr: any) {}
}
