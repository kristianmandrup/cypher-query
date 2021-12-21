import {
  AliasMap,
  GraphObjDef,
  NodeDef,
  NodeRelOpts,
  Props,
  RelationDef,
} from "../../..";
import { Clause } from "../../clause";

export class Match extends Clause {
  $optional = false;
  currentNode: any;

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

  pattern(...graphObjs: GraphObjDef[]) {
    let objType = "";
    const map = graphObjs.reduce((acc, obj) => {
      if (objType && obj.type === objType) {
        const nextType = objType === "edge" ? "node" : "edge";
        throw new Error(`Invalid object in this position, must be ${nextType}`);
      }
      // ...
      objType = obj.type || "";
      return acc;
    }, {});
    return map;
  }

  rel(nodeDef: NodeDef, opts: NodeRelOpts = {}) {
    const rel: any = this.ctx.matchRel(nodeDef, opts);
    if (!rel.alias) return {};
    const map = {
      [rel.alias]: rel,
    };
  }

  to(nodeDef: NodeDef, relation?: RelationDef) {
    return this.rel(nodeDef, { to: nodeDef, relation });
  }

  from(nodeDef: NodeDef, relation?: RelationDef) {
    return this.rel(this.currentNode, { from: nodeDef, relation });
  }
}
