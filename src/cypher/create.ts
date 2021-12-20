import { AliasMap, GunSchema, ObjSetArgs } from "..";

export class Create {
  ctx: GunSchema;

  constructor(ctx: GunSchema) {
    this.ctx = ctx;
  }

  // CREATE (n:Person:Swedish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-a-node-with-multiple-labels
  node(alias: string, opts: ObjSetArgs) {
    const node = this.ctx.createNode(opts);
    return {
      [alias]: node,
    };
  }

  // CREATE (n:Person:Swedish), (m:Person:Danish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-multiple-nodes
  nodes(aliasMap: AliasMap) {
    return Object.keys(aliasMap).reduce((acc, key) => {
      const opts = aliasMap[key];
      const mapping = this.node(key, opts);
      acc = {
        ...mapping,
      };
      return acc;
    }, {});
  }
}
