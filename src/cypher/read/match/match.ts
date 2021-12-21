import { AliasMap, NodeDef, Props } from "../../..";
import { Clause } from "../../clause";

export class Match extends Clause {
  $optional = false;

  mergeMap(aliasMap: Props) {
    return this.q.mergeAliasMap(aliasMap, "matches");
  }

  optional() {
    this.$optional = true;
    return this;
  }

  // MATCH (n:Person:Swedish)
  protected node(nodeDef: NodeDef, merge = true) {
    const node = this.ctx.matchNode(nodeDef);
    if (!nodeDef.alias) return {};
    const map = {
      [nodeDef.alias]: node,
    };
    if (!merge) return map;
    return this.mergeMap(map);
  }

  // MATCH (n:Person:Swedish), (m:Person:Danish)
  // https://neo4j.com/docs/cypher-manual/current/clauses/create/#create-create-multiple-nodes
  nodes(nodeDefs: NodeDef[]) {
    const map = nodeDefs.reduce((acc, nodeDef) => {
      const mapping = this.node(nodeDef, false);
      acc = {
        ...mapping,
      };
      return acc;
    }, {});
    return this.mergeMap(map);
  }

  rel(nodeDef: NodeDef, opts = {}) {
    const node = this.ctx.matchNode(nodeDef, opts);
    if (!nodeDef.alias) return {};
    const map = {
      [nodeDef.alias]: node,
    };
  }

  to(nodeDef: NodeDef) {
    const direction = "to";
    return this.rel(nodeDef, { direction });
  }

  from(nodeDef: NodeDef) {
    const direction = "from";
    return this.rel(nodeDef, { direction });
  }
}
