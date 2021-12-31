import { NodeDef, RelationDef } from "../cypher/cypher-types";

export interface IGraphApi {
  createNode(opts: NodeDef): any;
  createEdge(fromId: string, toId: string, edgeDef: RelationDef): any;

  propValue(node: any, propName: string): any;
}
