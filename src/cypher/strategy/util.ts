export class NodeUtils {
  propValue(node: any, propName: string) {
    return node["__props"][propName];
  }
}
