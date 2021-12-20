import Gun from "gun";

/* SECTION: DFS functionality */

/* Depth First Search - explore all of the nodes from the given Soul
 * then update D3 data and the force-layout from the html
 */

export class DFS {
  gun: any
  stack: any[] = [];
  nodes: any
  edges: any
  start: any;
  u: any;
  label: string = "";
  opt = false;
  stop = false;
  limit = 500;

  constructor(gun: any) {
    this.gun = gun
  }

  printMap(map: any) {
    const array: any[] = Array.from(map);
    var l = array.length;
    for (let i=0; i < l; i++) {
      console.log(array[i][1]);
    }
  };

  printArr(array: any[]) {
    for (let i=0; i < array.length; i++) {
      console.log(array[i]);
    }
  };

  makeNodes(map: any) {
    const array: any[]  = Array.from(map);
    var nodes = [];
    for (let i = 0; i < array.length; i++) {
      nodes.push(array[i][1]);
    }
    return nodes;
  };

  makeEdges(map: any) {
    const array: any[]  = Array.from(map);
    var edges = [];
    for (let i=0; i < array.length; i++) {
      edges.push(array[i][1]);
    }
    return edges;
  };

  search(soul: any, lbl: any, lim: any) {
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
  };

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
    if (!opt || node[label] == undefined) {
      nodes.set(soul, { id: soul, label: key });
    } else {
      nodes.set(soul, { id: soul, label: node[label] });
    }
    dfs.edge(u, edges);
  };

  dfs.edge = function (node, edges) {
    if (stop) {
      console.log("stopped");
      return;
    }
    var temp;
    var soul = Gun.node.soul(node);
    var tLabel = "none";
    var arr = Object.keys(node);
    for (var item of arr) {
      //save label if the prop meets the label
      if (item == label) {
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
          var temp = node[item];
          break;
        }
      }
    }
    if (temp) {
      dfs.next(temp, soul, temp["#"], tLabel);
    } else {
      if (start == soul) {
        stack.pop();
      }
      dfs.back();
    }
  };

  dfs.next = function (next, edgeS, edgeT, tLabel) {
    var v = next;
    var soul = v["#"];
    nodes.set(soul, { id: soul, label: v["#"] });
    edges.set(edgeS + edgeT, { source: edgeS, target: edgeT });
    stack.push(soul);
    u = v;
    if (nodes.size >= limit) {
      console.info("Reached limit");
      dfs.render();
      return;
    }
    gun.get(soul).once(dfs.node);
  };

  dfs.back = function () {
    if (!(stack.length == 0)) {
      soul = stack.pop();
      gun.get(soul).once(dfs.node);
    } else {
      dfs.render();
    }
  };

  dfs.render = function () {
    //console.log('Rendering');
    graph.nodes = util.makeNodes(nodes);
    graph.edges = util.makeEdges(edges);
    update();
  };

  return dfs;
})(Gun, gun, graph, update);

/* SECTION: DFS functionality */
