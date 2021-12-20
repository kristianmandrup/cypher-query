import Gun from "gun";
import "gun/lib/then";
import { ObjSetArgs, RelSetArgs } from ".";

/* Abstraction Layer to GunDB
 * Functions to abstract the creation of a schema
 */

import { DFS } from "./search";
import { IPromisedChain } from "./types";

/* Schema definitions:
 * Metadata should start with double-underscore
 * all items should include __label and __type with the corresponding type
 * __label = a name that visualGraph can display for the node
 * __type = either 'node', 'edge' or 'index', this will become important
 *   when querying happens
 */

export class GunSchema {
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

  createNode(opts: ObjSetArgs) {
    const object = this.gun.get("node");
    return this.setNode(object, opts);
  }

  createEdge(opts: ObjSetArgs) {
    const object = this.gun.get("edge");
    return this.setEdge(object, opts);
  }

  protected setObj(object: any, opts: ObjSetArgs) {
    const label = opts.label && [opts.label];
    const labels = label || opts.labels || [];
    const props = opts.props || {};
    object.__labels = this.filterLabels(labels);
    object.__props = props;
  }

  /* Schema for Nodes */
  setNode(object: any, opts: ObjSetArgs) {
    this.setObj(object, opts);
    object.__type = "node";
    const gunRef = this.nodes().set(object);
    return gunRef;
  }

  /* Schema for Edges */
  setEdge(object: any, opts: ObjSetArgs) {
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
  matchNode(opts: ObjSetArgs, relOpts: RelSetArgs = {}) {
    return this.dfs.search(this.gun, opts.label);
  }

  async matchNodeAsync(opts: ObjSetArgs, relOpts: RelSetArgs) {
    return await this.dfs.searchAsync(this.gun, opts.label);
  }

  /* Tuple function */
  /* Takes objects or references from Gun to create nodes */
  tuple(node: any, verb: any, object: any) {
    node.get("out").set(verb);
    verb.get("source").put(node);
    verb.get("target").put(object);
    object.get("in").set(verb);
    setTimeout(() => this.dfs.search("nodes", "__labels"), 1000);
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
