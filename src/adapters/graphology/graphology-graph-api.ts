import Graph from "graphology";
import { IGraphApi } from "..";

import { GraphObjDef, NodeDef, RelationDef } from "../../cypher/cypher-types";

import { uuidv4 } from "../utils";

export class MemDB {
  graph: Graph;

  constructor(graph?: Graph) {
    this.graph = graph || new Graph();
  }

  addNode(id: string) {
    return this.graph.addNode({ id });
  }

  addEdge(fromId: string, toId: string, edgeDef: any) {
    return this.graph.addEdge(fromId, toId, edgeDef);
  }

  edges() {
    return this.graph.edges();
  }

  nodes() {
    return this.graph.nodes();
  }
}

export class GraphologyGraphApi implements IGraphApi {
  memdb: MemDB;

  constructor(memdb: any) {
    this.memdb = memdb;
  }

  protected validateLabel(label: string) {
    return label.trim().length;
  }

  protected filterLabels(labels: string[]) {
    return labels.filter(this.validateLabel);
  }

  createNode(opts: NodeDef) {
    const id = uuidv4();
    const object = this.memdb.addNode(id);
    return this.setNode(object, opts);
  }

  createEdge(fromId: string, toId: string, edgeDef: RelationDef) {
    const id = uuidv4();
    return this.memdb.addEdge(fromId, toId, edgeDef);
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
  setNode(object: any, nodeDef: NodeDef) {
    this.setObj(object, nodeDef);
    object.__type = "node";
    return nodeDef;
  }

  createRel(fromNode: any, relation: RelationDef, toNode: any) {
    //
  }

  /* Schema for Edges */
  setEdge(object: any, relDef: RelationDef) {
    this.setObj(object, relDef);
    object.__type = "edge";
    return relDef;
  }

  nodes = () => {
    return this.memdb.nodes();
  };

  //.put({'__type':'index','__label':'edgesIndex'}); //same here
  edges = () => {
    return this.memdb.edges();
  };
}
