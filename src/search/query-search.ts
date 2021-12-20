import Gun from "gun";
import { GunSchema } from "..";
import { DFS } from "./dfs";

/* BFS Search for Pattern (Query) */

export interface SearchResult {
  item: any;
  node: any;
}

type ResultReceiver = (result: SearchResult) => any;

type SearchCreateOpts = { log?: boolean; resultReceiver?: ResultReceiver };

export class QuerySearch {
  log: boolean = false;
  tObj: any = {};
  gun: any;
  schema: GunSchema;
  dfs: DFS;
  resultReceiver?: ResultReceiver;

  constructor(schema: GunSchema, opts: SearchCreateOpts = {}) {
    this.schema = schema;
    this.gun = schema.gun;
    this.dfs = new DFS(schema);
    this.setOptions(opts);
  }

  setOptions(opts: SearchCreateOpts = {}) {
    this.resultReceiver = opts.resultReceiver;
    this.log = opts.log || this.log;
    return this;
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

  async searchAsync() {}

  step(node: any, key?: string) {
    if (typeof node != "string") {
      const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
      console.log(soul);
      if (this.matches(node, "subject")) {
        this.gun.get(soul).get("out").map().once(this.look.bind(null, soul));
      }
    }
  }

  protected matches(node: any, propName: string) {
    return (
      node["__labels"].find(this.tObj[propName]) ||
      this.tObj[propName][0] == "?"
    );
  }

  look(parent: any, node: any, key: string) {
    console.log("Qlook", key, node, parent);
    const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
    if (this.matches(node, "predicate")) {
      const temp = parent + "__" + soul;
      this.gun.get(node.target["#"]).once(this.find.bind(null, temp));
    }
  }

  find(parent: any, node: any, key: string) {
    console.log("Qfind", key, node, parent);
    const soul = Gun.node.soul(node); /*node['_']['#'] || node['#']*/
    if (this.matches(node, "subject")) {
      const temp = parent + "__" + soul;
      console.log("pushed", temp);
      this.tObj.result.push(temp);
      this.presentResult();
    }
  }

  presentResultNotFound() {
    if (this.tObj.result) return false;
    console.log("no results");
    return true;
  }

  presentResultFound() {
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
    return;
  }

  presentResult() {
    return this.presentResultNotFound() || this.presentResultFound();
  }

  logResult({ item, node }: SearchResult) {
    if (!this.log) return;
    console.log(item, { labels: node["__labels"], props: node["__props"] });
  }

  notify(result: SearchResult) {
    if (!this.resultReceiver) return;
    this.resultReceiver(result);
  }

  nice(item: any, node: any) {
    const result = { item, node };
    this.notify(result);
    this.logResult(result);
    return result;
  }
}
