import { GraphObjDef } from "../../../cypher-types";
import { ReturnObjValueExpr } from "./return-obj-value-expr";

export class ReturnPropExpr extends ReturnObjValueExpr {
  name: string = "prop";

  propName: string = "";

  mapObj(obj: GraphObjDef): any {
    const props = obj.props || {};
    return props[this.propName];
  }
}
