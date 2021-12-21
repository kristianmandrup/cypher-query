import { AliasMap, ObjSetArgs, Props } from "../../..";
import { Clause } from "../../clause";

export class Match extends Clause {
  mergeMap(aliasMap: Props) {
    return this.q.mergeAliasMap(aliasMap, "matches");
  }

  // MATCH (n:Person:Swedish)
  protected node(alias: string, opts: ObjSetArgs, merge = true) {
    const node = this.ctx.matchNode(opts);
    const map = {
      [alias]: node,
    };
    if (!merge) return map;
    return this.mergeMap(map);
  }

  // MATCH (n:Person:Swedish), (m:Person:Danish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-multiple-nodes
  nodes(aliasMap: AliasMap) {
    const map = Object.keys(aliasMap).reduce((acc, key) => {
      const opts = aliasMap[key];
      const mapping = this.node(key, opts, false);
      acc = {
        ...mapping,
      };
      return acc;
    }, {});
    return this.mergeMap(map);
  }

  rel(alias: string, opts: ObjSetArgs) {
    const node = this.ctx.matchNode(opts);
    const map = {
      [alias]: node,
    };
    return this.mergeMap(map);
  }

  to(alias: string, opts: ObjSetArgs) {
    const direction = "to";
    const node = this.ctx.matchNode(opts, { direction });
    const map = {
      [alias]: node,
    };
    return this.mergeMap(map);
  }

  from(alias: string, opts: ObjSetArgs) {
    const direction = "to";
    const node = this.ctx.matchNode(opts, { direction });
    const map = {
      [alias]: node,
    };
    return this.mergeMap(map);
  }
}
