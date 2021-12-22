import { Query } from "../..";
import {
  AliasMap,
  DirectedRelationDef,
  NodeDef,
  Props,
  RelationDef,
  StrMap,
} from "../../..";
import { Clause } from "../clause";

export class Create extends Clause {
  relation(fromNode: NodeDef, relation: DirectedRelationDef, toNode: NodeDef) {
    const from = this.firstFromMap(this.node(fromNode));
    const to = this.firstFromMap(this.node(toNode));
    const map = this.ctx.createRel(from, relation, to);
    return map;
  }

  relationTo(fromNode: NodeDef, relation: RelationDef, toNode: NodeDef) {
    return this.relation(fromNode, { ...relation, direction: "to" }, toNode);
  }

  relationFrom(fromNode: NodeDef, relation: RelationDef, toNode: NodeDef) {
    return this.relation(fromNode, { ...relation, direction: "from" }, toNode);
  }

  // CREATE (n:Person:Swedish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-a-node-with-multiple-labels
  node(opts: NodeDef = {}, merge = true) {
    const node = this.ctx.createNode(opts);
    if (!opts.alias)
      return {
        _: node,
      };
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

  relatednodes(
    nodeDefs: NodeDef[],
    relationShipMap: StrMap,
    skipOnMissingKey = false
  ) {
    const map = this.nodes(nodeDefs);
    const nodeKeys = nodeDefs.map((nodeDef) => nodeDef.alias);
    const resultMap = Object.keys(relationShipMap).reduce((acc, key) => {
      const targetKey = relationShipMap[key];
      if (!nodeKeys.includes(key)) {
      }
      if (!nodeKeys.includes(targetKey)) {
      }
      // ...
      return acc;
    });
    return resultMap;
  }
}
