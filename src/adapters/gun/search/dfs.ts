import Gun from "gun";

/* Depth First Search - explore all of the nodes from the given Soul
 * then update D3 data and the force-layout from the html
 */

export type ItemMatchFn = (item: any) => boolean;

export const defaults = {
  matches: (item: any, ctx: any) => {
    return item == ctx.label;
  },
};

export class DFS {
  gun: any;
  stack: any[] = [];
  nodes: any;
  edges: any;
  start: any;
  u: any;
  label: string = "";
  opt = false;
  stop = false;
  limit = 500;

  constructor(gun: any, opts: any = {}) {
    this.gun = gun;
    this.limit = opts.limit || this.limit || 500;
  }

  printMap(map: any) {
    const array: any[] = Array.from(map);
    var l = array.length;
    for (let i = 0; i < l; i++) {
      console.log(array[i][1]);
    }
  }

  printArr(array: any[]) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
  }

  makeNodes(map: any) {
    const array: any[] = Array.from(map);
    var nodes = [];
    for (let i = 0; i < array.length; i++) {
      nodes.push(array[i][1]);
    }
    return nodes;
  }

  makeEdges(map: any) {
    const array: any[] = Array.from(map);
    var edges = [];
    for (let i = 0; i < array.length; i++) {
      edges.push(array[i][1]);
    }
    return edges;
  }

  async searchAsync(soul: any, lbl: any, lim?: any) {}

  search(soul: any, lbl: any, lim?: any) {
    console.log("Starting with:", soul);
    if (lbl) {
      this.opt = true;
    } else {
      this.opt = false;
    }
    if (lim) {
      this.limit = lim;
    }
    console.log(this.limit);
    this.label = lbl;
    this.start = soul;
    this.stack = [];
    this.nodes = new Map();
    this.edges = new Map();
    this.gun.get(soul).once(this.node);
  }

  node(node: any, key: string) {
    //console.log('called', nodes.size);
    if (!node) {
      console.error("no data:", key, node);
      this.back();
      return;
    }
    let soul = Gun.node.soul(node);
    if (soul == this.start) {
      this.stack.push(soul);
    }
    this.u = node;
    if (!this.opt || node[this.label] == undefined) {
      this.nodes.set(soul, { id: soul, label: key });
    } else {
      this.nodes.set(soul, { id: soul, label: node[this.label] });
    }
    this.edge(this.u, this.edges);
  }

  edge(node: any, edges: any, matches = defaults.matches) {
    if (this.stop) {
      console.log("stopped");
      return;
    }
    let temp: any;
    let soul = Gun.node.soul(node);
    let tLabel = "none";
    let arr = Object.keys(node);
    for (let item of arr) {
      //save label if the prop meets the label
      if (matches(item, this)) {
        tLabel = node[item];
      }
      //console.log(tLabel);
      // if it's an object, then there is more
      if (typeof node[item] == "object") {
        //skip nulled items or metadata
        if (node[item] == null || item == "_") {
          continue;
        }
        if (!edges.has(soul + node[item]["#"])) {
          temp = node[item];
          break;
        }
      }
    }
    if (temp) {
      this.next(temp, soul, temp["#"], tLabel);
    } else {
      if (this.start == soul) {
        this.stack.pop();
      }
      this.back();
    }
  }

  next(next: any, edgeS: any, edgeT: any, tLabel: string) {
    let v = next;
    let soul = v["#"];
    this.nodes.set(soul, { id: soul, label: v["#"] });
    this.edges.set(edgeS + edgeT, { source: edgeS, target: edgeT });
    this.stack.push(soul);
    this.u = v;
    if (this.nodes.size >= this.limit) {
      console.info("Reached limit");
      return;
    }
    this.gun.get(soul).once(this.node);
  }

  back() {
    if (this.stack.length == 0) return;
    let soul = this.stack.pop();
    this.gun.get(soul).once(this.node);
  }
}
