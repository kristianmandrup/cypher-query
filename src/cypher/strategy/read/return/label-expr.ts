import { ReturnExpr } from ".";
import { GraphObjDef } from "../../../cypher-types";
import { ReturnObjValueExpr } from "./return-obj-value-expr";

export class ReturnLabelExpr extends ReturnObjValueExpr {
  name: string = "label";

  label: string = "";

  mapObj(obj: GraphObjDef): any {
    const labels = obj.labels || [];
    return labels.find((label) => label === this.label);
  }
}
