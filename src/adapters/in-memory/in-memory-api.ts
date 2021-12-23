import {
  GraphObjDef,
  NodeDef,
  NodeRelOpts,
  RelationDef,
  RelSetArgs,
} from "../../cypher/cypher-types";

import { uuidv4 } from "../utils";

export class InMemoryApi {
  memdb: any;
  $nodes: any;
  $edges: any;

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
    const object = this.memdb.createNode(id);
    return this.setNode(object, opts);
  }

  createEdge(opts: NodeDef) {
    const id = uuidv4();
    const object = this.memdb.createEdge(id);
    return this.setEdge(object, opts);
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
  setNode(object: any, opts: NodeDef) {
    this.setObj(object, opts);
    object.__type = "node";
    const ref = this.nodes().set(object);
    return ref;
  }

  createRel(fromNode: any, relation: RelationDef, toNode: any) {
    //
  }

  /* Schema for Edges */
  setEdge(object: any, opts: NodeDef) {
    this.setObj(object, opts);
    object.__type = "edge";
    const ref = this.edges().set(object);
    return ref;
  }

  nodes = () => {
    this.$nodes = this.$nodes || this.memdb.nodes;
    return this.$nodes;
  };

  //.put({'__type':'index','__label':'edgesIndex'}); //same here
  edges = () => {
    this.$edges = this.$edges || this.memdb.edges;
    return this.$edges;
  };
}
