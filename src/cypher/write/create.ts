import { Query } from "..";
import { AliasMap, ObjSetArgs } from "../..";
import { Clause } from "../clause";

export class Create extends Clause {
  // CREATE (n:Person:Swedish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-a-node-with-multiple-labels
  node(alias: string, opts: ObjSetArgs = {}, merge = true) {
    const node = this.ctx.createNode(opts);
    const map = {
      [alias]: node,
    };
    if (!merge) return map;
    return this.mergeAliasMap(map);
  }

  // CREATE (n:Person:Swedish), (m:Person:Danish)
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
    return this.mergeAliasMap(map);
  }
}
