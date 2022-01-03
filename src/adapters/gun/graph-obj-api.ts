import { IGraphObjApi } from "../..";

export class GunObjApi implements IGraphObjApi {
  propValue(node: any, propName: string) {
    const props = node["__props"] || {};
    return props[propName];
  }

  nodeLabels(node: any): string[] {
    return node["__labels"] || [];
  }
}
