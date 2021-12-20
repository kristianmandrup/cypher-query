import Gun from "gun";

//TODO: Finish this

/* Breadth First Search - explore all of the nodes from the given Soul
 * then update D3 data and the force-layout from the html
 */
// Breadth First Search
export class BFS {
  u: any;
  opt = true;
  label = "label";
  start = "startSould";
  stack: any[] = [];
  nodes = new Map();
  edges = new Map();
  root: any;

  constructor(root: any) {
    this.root = root;
  }

  async run() {
    const start = await this.root.get(this.start).promise();

    this.nodes.set(start.key, {
      id: start.key,
      label: start.data.label,
      data: start.data,
    });
    this.u = start;
    this.stack.push(this.u);

    do {
      while (!this.exhausted(this.u.data, this.edges)) {
        // release control on each loop for ui
        await this.delay(20); //play with this value
        var edge = this.exhausted(this.u.data, this.edges, true);
        var v = await this.root.get(edge).promOnce();
        this.nodes.set(v.key, { id: v.key, label: v.data.label, data: v.data });
        this.edges.set(this.u.key + v.key, {
          source: this.u.key,
          target: v.key,
        });
        this.stack.push(v);
      }
      while (!(this.stack.length == 0)) {
        await this.delay(20);
        const y = this.stack.shift();
        if (!this.exhausted(y.data, this.edges)) {
          this.stack.push(y);
          this.u = y;
          break;
        }
      }
    } while (!(this.stack.length == 0));
  }

  // console.log(nodes, edges);

  exhausted(node: any, edges: any, opt?: any) {
    var soul = Gun.node.soul(node);
    var arr = Object.keys(node);
    var i = 1;
    var l = arr.length;
    for (; i < l; i++) {
      if (typeof node[arr[i]] == "object" && node[arr[i]] != null) {
        if (!edges.has(soul + node[arr[i]]["#"])) {
          var temp = node[arr[i]]["#"];
          break;
        }
      }
    }
    if (!opt) {
      if (temp) {
        return false;
      } else {
        return true;
      }
    } else {
      if (temp) {
        return temp;
      }
    }
  }

  transformMap(map: any) {
    var array: any[] = Array.from(map);
    var result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i][1]);
    }
    return result;
  }

  delay(ms: number) {
    return new Promise((res) => {
      setTimeout(res, ms);
    });
  }
}
