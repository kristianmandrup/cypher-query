import Gun from "gun";

const gun = Gun();
/*
Allowing 2 users to collaborate on the same path.
This makes it write only for each user, but in a UI using below function you
can now see whatever was added latest collaboration
*/

export async function getLatest(path: string[], pubkeyOther: string) {
  let refMe = gun.user();
  let refBob = gun.user(pubkeyOther);
  console.log("me", refMe);
  console.log("bob", refBob);
  while (path.length > 0) {
    const step = path.shift();
    if (step) {
      refMe = refMe.get(step);
      refBob = refBob.get(step);
    }
  }
  const me = await refMe.promOnce();
  console.log("me", me.data);
  const bob = await refBob.promOnce();
  console.log("bob", bob.data);
  return Gun.state.node(me.data, bob.data);
}

/* Abstraction Layer to GunDB
 * Functions to abstract the creation of a schema
 */

/* Schema definitions:
 * Metadata should start with double-underscore
 * all items should include __label and __type with the corresponding type
 * __label = a name that visualGraph can display for the node
 * __type = either 'node', 'edge' or 'index', this will become important
 *   when querying happens
 */

/* Schema for Nodes */
export function newNode(object: any, label: string) {
  object.__label = label;
  object.__type = "node";
  const gunRef = nodes().set(object);
  return gunRef;
}

/* Schema for Edges */
export function newEdge(object: any, label: string) {
  object.__label = label;
  object.__type = "edge";
  const gunRef = edges().set(object);
  return gunRef;
}

let $nodes: any, $edges: any;

/* Create Index for Nodes and Edges */
//.put({'__type':'index','__label':'nodesIndex'}); //creates global nodes index, but not write protected
export const nodes = () => {
  $nodes = $nodes || gun.get("nodes");
  return $nodes;
};

//.put({'__type':'index','__label':'edgesIndex'}); //same here
export const edges = () => {
  $edges = $edges || gun.get("edges");
  return edges;
};

/* Tuple function */
/* Takes objects or references from Gun to create nodes */
export const tuple = function (node: any, verb: any, object: any) {
  node.get("out").set(verb);
  verb.get("source").put(node);
  verb.get("target").put(object);
  object.get("in").set(verb);
  setTimeout(DFS.search("nodes", "__label"), 1000);
};

export const addNode = function (label: string, edgeR: any, nodeR: any) {
  const obj = { label: label, edge: edgeR, node: nodeR };
  nodes()
    .map()
    .once(
      function (obj: any, data: any, key: string) {
        if (data.__label == obj.label) {
          const soul = Gun.node.soul(data);
          let node = gun.get(soul).get("out").set(obj.edge);
          console.log(node._.soul);
          node = gun.get(node._.soul);
          obj.edge.get("source").put(node);
          obj.edge.get("target").put(obj.node);
          obj.node.get("in").set(obj.edge);
        } else {
          console.log(`${obj.label}, not found`);
        }
      }.bind(null, obj)
    );
};

/* BFS Search for Pattern (Query) */

export class QuerySearch {
  tObj: any = {};

  static search(obj: any) {
    return new QuerySearch().search(obj);
  }

  search(obj: any) {
    this.tObj = obj;
    if (this.tObj.subject) {
      nodes().map().once(this.step);
    } else {
      throw "no pattern defined";
    }
  }

  step(node: any, key: string) {
    if (typeof node != "string") {
      const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
      console.log(soul);
      if (node["__label"] == this.tObj.subject || this.tObj.subject[0] == "?") {
        gun.get(soul).get("out").map().once(this.look.bind(null, soul));
      }
    }
  }

  look(parent: any, node: any, key: string) {
    console.log("Qlook", key, node, parent);
    const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
    if (
      node["__label"] == this.tObj.predicate ||
      this.tObj.predicate[0] == "?"
    ) {
      const temp = parent + "__" + soul;
      gun.get(node.target["#"]).once(this.find.bind(null, temp));
    }
  }

  find(parent: any, node: any, key: string) {
    console.log("Qfind", key, node, parent);
    const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
    if (node["__label"] == this.tObj.subject || this.tObj.subject[0] == "?") {
      const temp = parent + "__" + soul;
      console.log("pushed", temp);
      this.tObj.result.push(temp);
      this.print();
    }
  }

  print() {
    if (!this.tObj.result) {
      console.log("no results");
      return;
    } else {
      const i = 0;
      const l = this.tObj.result.length;
      for (i; i < l; i++) {
        let temp = this.tObj.result[i];
        temp = temp.split("__");
        const y = 0;
        const l1 = temp.length;
        for (y; y < l1; y++) {
          gun.get(temp[y]).once(this.nice.bind(null, y));
        }
      }
      DFS.search("nodes", "__label");
    }
  }

  nice(item: any, node: any) {
    console.log(item, node["__label"]);
  }
}

class QueryFind {
  tObj: any;

  constructor() {
    this.tObj = {};
  }

  isMatch(is: string[], toMatch: string[]) {
    return toMatch.some(function (v: string) {
      return is.indexOf(v) >= 0;
    });
  }

  print() {
    console.log("Found:");
    const arr = Object.entries(this.tObj.result[0]);
    const i = 0;
    const l = arr.length;
    for (let i = 0; i < l; i++) {
      console.log(arr[i][0]);
      console.log(arr[i][1]);
    }
    DFS.search("nodes", "__label");
  }

  static find(obj: any) {
    return new QueryFind().find(obj);
  }

  find(obj: any) {
    this.tObj = obj;
    nodes().map().once(this.match);
  }

  match(node: any, key: string) {
    if (typeof node != "string") {
      const keysQ = Object.keys(this.tObj.obj);
      const keys = Object.keys(node);
      const soul = node._.soul;
      if (this.isMatch(keys, keysQ)) {
        for (const i = 0; i < keys.length; i++) {
          for (const y = 0; y < keysQ.length; y++) {
            const qK = keysQ[y];
            const qV = this.tObj.obj[qK];
            const k = keys[i];
            const v = node[k];
            if (qV == v && k == qK) {
              this.tObj.result.push(node);
              this.print();
            }
          }
        }
      } else {
        console.log("no match!");
        return;
      }
    } else {
      return;
    }
  }
}

/* Triple Traversal Object
 * This stores options and is meant to become the transport object between
 * functions that execute during Traversal
 */

interface ITriple {
  subject: any;
  predicate: any;
  object: any;
  result?: any[];
}

class TripTrav {
  subject: any;
  predicate: any;
  object: any;
  result: any[];

  constructor(triple: ITriple) {
    this.subject = triple.subject;
    this.predicate = triple.predicate;
    this.object = triple.object;
    this.result = [];
  }
}

const triple = { subject: "?p", predicate: "type", object: "Artist" };
const trav = new TripTrav(triple);
QuerySearch.search(trav);

/* Select an object to match from a node */

class SelectTrav {
  obj: any;
  result: any[];

  constructor(obj: any) {
    this.obj = obj;
    this.result = [];
  }
}

const selection = { name: "Ice Cream" };
const travSel = new SelectTrav(selection);
QueryFind.find(travSel);

/* Local Graph Functions
 * To build a graph for queries
 * To build a graph to perform graph operations on
 */

const localGraph = function () {
  (this.map = new Map()),
    (this.add = function (item) {
      const uuid = uuidv4();
      this.map.set(uuid, item);
      return uuid;
    }),
    (this.find = function (uuid) {
      return this.map.get(uuid);
    }),
    (this.update = function (uuid, item) {
      this.map.set(uuid, item);
    });
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const lGraph = new localGraph();
const test = lGraph.add({ id: "test1" });
const obj = {
  name: "test",
  label: "person",
  birthdate: "07-05-1986",
  link: test,
};
const test0 = lGraph.add(obj);
