import Gun from "gun";
import { GunSchema } from "./schema";

import { DFS } from "./search/dfs";

/* BFS Search for Pattern (Query) */

export class QuerySearch {
  tObj: any = {};
  gun: any;
  schema: GunSchema;
  dfs: DFS;

  constructor(schema: GunSchema) {
    this.schema = schema;
    this.gun = schema.gun;
    this.dfs = new DFS(schema);
  }

  static search(schema: GunSchema, obj: any) {
    return new QuerySearch(schema).search(obj);
  }

  nodes() {
    return this.schema.nodes();
  }

  search(obj: any) {
    this.tObj = obj;
    if (this.tObj.subject) {
      this.nodes().map().once(this.step);
    } else {
      throw "no pattern defined";
    }
  }

  step(node: any, key: string) {
    if (typeof node != "string") {
      const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
      console.log(soul);
      if (node["__label"] == this.tObj.subject || this.tObj.subject[0] == "?") {
        this.gun.get(soul).get("out").map().once(this.look.bind(null, soul));
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
      this.gun.get(node.target["#"]).once(this.find.bind(null, temp));
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
      const l = this.tObj.result.length;
      for (let i = 0; i < l; i++) {
        let temp = this.tObj.result[i];
        temp = temp.split("__");
        const l1 = temp.length;
        for (let y = 0; y < l1; y++) {
          this.gun.get(temp[y]).once(this.nice.bind(null, y));
        }
      }
      this.dfs.search("nodes", "__label");
    }
  }

  nice(item: any, node: any) {
    console.log(item, node["__label"]);
  }
}

export class QueryFind {
  tObj: any;

  schema: GunSchema;
  dfs: DFS;

  constructor(schema: GunSchema) {
    this.schema = schema;
    this.dfs = new DFS(schema);
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
    this.dfs.search("nodes", "__label");
  }

  static find(schema: GunSchema, obj: any) {
    return new QueryFind(schema).find(obj);
  }

  nodes() {
    return this.schema.nodes();
  }

  find(obj: any) {
    this.tObj = obj;
    this.nodes().map().once(this.match);
  }

  match(node: any, key: string) {
    if (typeof node != "string") {
      const keysQ = Object.keys(this.tObj.obj);
      const keys = Object.keys(node);
      const soul = node._.soul;
      if (this.isMatch(keys, keysQ)) {
        for (let i = 0; i < keys.length; i++) {
          for (let y = 0; y < keysQ.length; y++) {
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

export class TripTrav {
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

/* Select an object to match from a node */

export class SelectTrav {
  obj: any;
  result: any[];

  constructor(obj: any) {
    this.obj = obj;
    this.result = [];
  }
}

/* Local Graph Functions
 * To build a graph for queries
 * To build a graph to perform graph operations on
 */

export class LocalGraph {
  map = new Map();

  constructor() {}

  add(item: any) {
    const uuid = uuidv4();
    this.map.set(uuid, item);
    return uuid;
  }

  find(uuid: string) {
    return this.map.get(uuid);
  }
  update(uuid: string, item: any) {
    this.map.set(uuid, item);
  }
}

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
