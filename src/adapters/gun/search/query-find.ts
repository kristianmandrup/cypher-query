import { DFS } from ".";
import { GunAPI } from "../../..";

export class QueryFind {
  tObj: any;

  schema: GunAPI;
  dfs: DFS;

  constructor(schema: GunAPI) {
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
    this.dfs.search("nodes", "__labels");
  }

  static find(schema: GunAPI, obj: any) {
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
