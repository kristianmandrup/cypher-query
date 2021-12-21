import { Query } from "..";
import { AliasMap, NodeDef, RelationDef } from "../..";
import { Clause } from "../clause";

export class Create extends Clause {
  relation(fromNode: NodeDef, relation: RelationDef, toNode: NodeDef) {
    this.node(fromNode);
    this.node(toNode);
    // this._relationship();
  }

  // CREATE (n:Person:Swedish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-a-node-with-multiple-labels
  node(opts: NodeDef = {}, merge = true) {
    const node = this.ctx.createNode(opts);
    if (!opts.alias) return {};
    const map = {
      [opts.alias]: node,
    };
    if (!merge) return map;
    return this.mergeAliasMap(map);
  }

  // CREATE (n:Person:Swedish), (m:Person:Danish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-multiple-nodes
  nodes(nodeDefs: NodeDef[]) {
    const map = nodeDefs.reduce((acc, nodeDef) => {
      const mapping = this.node(nodeDef, false);
      acc = {
        ...mapping,
      };
      return acc;
    }, {});
    return this.mergeAliasMap(map);
  }
}
