//TODO: Finish this

/* Breadth First Search - explore all of the nodes from the given Soul
 * then update D3 data and the force-layout from the html
 */
// Breadth First Search
export const bfs = (async function () {
  var stack;
  var nodes;
  var edges;
  var start;
  var u;
  var label;
  var opt = true;

  label = "label";
  start = "startSould";
  stack = [];
  nodes = new Map();
  edges = new Map();
  start = await root.get(start).promOnce();
  nodes.set(start.key, {
    id: start.key,
    label: start.data.label,
    data: start.data,
  });
  u = start;
  stack.push(u);
  do {
    while (!exhausted(u.data, edges)) {
      // release control on each loop for ui
      await delay(20); //play with this value
      var edge = exhausted(u.data, edges, true);
      var v = await root.get(edge).promOnce();
      nodes.set(v.key, { id: v.key, label: v.data.label, data: v.data });
      edges.set(u.key + v.key, { source: u.key, target: v.key });
      stack.push(v);
    }
    while (!(stack.length == 0)) {
      await delay(20);
      var y = stack.shift();
      if (!exhausted(y.data, edges)) {
        stack.push(y);
        u = y;
        break;
      }
    }
  } while (!(stack.length == 0));

  console.log(nodes, edges);

  function exhausted(node, edges, opt) {
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

  function transformMap(map) {
    var array = Array.from(map);
    var result = [];
    var i = 0;
    var l = array.length;
    for (; i < l; i++) {
      result.push(array[i][1]);
    }
    return result;
  }

  function delay(ms) {
    return new Promise((res, rej) => {
      setTimeout(res, ms);
    });
  }
})((root = gun));
