import Gun from "gun";
import "gun/lib/then";
import {
  GraphObjDef,
  NodeDef,
  NodeRelOpts,
  RelationDef,
  RelSetArgs,
} from "../../cypher/cypher-types";

/* Abstraction Layer to GunDB
 * Functions to abstract the creation of a schema
 */

import { DFS } from "./search";
import { IPromisedChain } from "../../types";
import { IGraphApi } from "..";

/* Schema definitions:
 * Metadata should start with double-underscore
 * all items should include __label and __type with the corresponding type
 * __label = a name that visualGraph can display for the node
 * __type = either 'node', 'edge' or 'index', this will become important
 *   when querying happens
 */

export class GunAPI implements IGraphApi {
  gun: any;
  $nodes: any;
  $edges: any;
  dfs: DFS;

  constructor(gun: any) {
    this.gun = gun;
    this.dfs = new DFS(gun);
  }

  /*
Allowing 2 users to collaborate on the same path.
This makes it write only for each user, but in a UI using below function you
can now see whatever was added latest collaboration
*/

  async getLatest(path: string[], pubkeyOther: string) {
    let refMe = this.gun.user();
    let refBob = this.gun.user(pubkeyOther);
    console.log("me", refMe);
    console.log("bob", refBob);
    while (path.length > 0) {
      const step = path.shift();
      if (step) {
        refMe = refMe.get(step);
        refBob = refBob.get(step);
      }
    }
    let me: any, bob: any;
    me = await (refMe as IPromisedChain).promise();
    console.log("me", me.data);
    bob = await (refBob as IPromisedChain).promise();
    console.log("bob", bob.data);
    return Gun.node.soul(me.data); //, bob.data);
  }

  protected validateLabel(label: string) {
    return label.trim().length;
  }

  protected filterLabels(labels: string[]) {
    return labels.filter(this.validateLabel);
  }

  createNode(opts: NodeDef) {
    const object = this.gun.get("node");
    return this.setNode(object, opts);
  }

  createEdge(fromId: string, toId: string, edgeDef: RelationDef) {
    return {};
  }

  protected setObj(object: any, opts: GraphObjDef) {
    const label = opts.label && [opts.label];
    const labels = label || opts.labels || [];
    const props = opts.props || {};
    object.__labels = this.filterLabels(labels);
    object.__props = props;
    return object;
  }

  /* Schema for Nodes */
  setNode(object: any, opts: NodeDef) {
    this.setObj(object, opts);
    object.__type = "node";
    const gunRef = this.nodes().set(object);
    return gunRef;
  }

  createRel(fromNode: any, relation: RelationDef, toNode: any) {
    return this.tuple(fromNode, relation, toNode);
  }

  /* Schema for Edges */
  setEdge(object: any, opts: NodeDef) {
    this.setObj(object, opts);
    object.__type = "edge";
    const gunRef = this.edges().set(object);
    return gunRef;
  }

  /* Create Index for Nodes and Edges */
  //.put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
  nodes = () => {
    this.$nodes = this.$nodes || this.gun.get("nodes");
    return this.$nodes;
  };

  //.put({'__type':'index','__label':'edgesIndex'}); //same here
  edges = () => {
    this.$edges = this.$edges || this.gun.get("edges");
    return this.$edges;
  };

  // TODO: support matching multiple labels and props
  matchNode(node: NodeDef, relOpts: RelSetArgs = {}) {
    return this.dfs.search(this.gun, node.label);
  }

  matchRel(node: NodeDef, nodeRelOpts: NodeRelOpts = {}) {
    return this.dfs.search(this.gun, node.label, nodeRelOpts);
  }

  async matchNodeAsync(opts: NodeDef, relOpts: RelSetArgs) {
    return await this.dfs.searchAsync(this.gun, opts.label);
  }

  /* Tuple function */
  /* Takes objects or references from Gun to create nodes */
  tuple(fromNode: any, relationship: any, toNode: any) {
    const relNode = relationship.__labels
      ? relationship
      : this.gun.get(relationship);
    const { direction } = relationship;
    if (direction !== "from") {
      fromNode.get("out").set(relNode);
    }

    relNode.get("source").put(fromNode);
    relNode.get("target").put(toNode);
    if (direction !== "to") {
      toNode.get("in").set(relNode);
    }
    return {
      from: fromNode,
      to: toNode,
      relation: relNode,
    };
    // setTimeout(() => this.dfs.search("nodes", "__labels"), 1000);
  }

  addNode(edgeR: any, nodeR: any, ...labels: string[]) {
    const obj = { labels: labels, edge: edgeR, node: nodeR };
    this.nodes()
      .map()
      .once((obj: any, data: any, key: string) => {
        if (data.__labels.find(obj.label)) {
          const soul = Gun.node.soul(data);
          let node = this.gun.get(soul).get("out").set(obj.edge);
          console.log(node._.soul);
          node = this.gun.get(node._.soul);
          obj.edge.get("source").put(node);
          obj.edge.get("target").put(obj.node);
          obj.node.get("in").set(obj.edge);
        } else {
          console.log(`${obj.label}, not found`);
        }
      });
  }
}
