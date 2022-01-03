export interface IGraphObjApi {
  propValue(node: any, propName: string): any;
  nodeLabels(node: any): string[];
}
