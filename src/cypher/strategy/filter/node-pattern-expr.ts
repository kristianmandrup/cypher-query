import { FilterExpr, IFilterResult } from ".";
import { GraphObjDef } from "../../cypher-types";

export class NodePatternExpr extends FilterExpr {
  fr: IFilterResult = {};

  config(fr: IFilterResult) {
    this.fr = fr;
  }

  matchPattern() {
    let objType = "";
    return (acc: any, key: string) => {
      const obj: any = this.fr[key];
      if (objType && obj.type === objType) {
        const nextType = objType === "edge" ? "node" : "edge";
        throw new Error(`Invalid object in this position, must be ${nextType}`);
      }
      // ...
      objType = obj.type || "";
      acc[key] = acc[key] || [];
      acc[key].push(obj);
      return acc;
    };
  }

  run() {
    return Object.keys(this.fr).reduce(this.matchPattern());
  }
}
