import { ReturnExpr } from ".";
import { GraphObjDef } from "../../../cypher-types";

export interface IReturnValue {}

export abstract class ReturnObjValueExpr extends ReturnExpr {
  alias: string = "";

  mapObj(obj: GraphObjDef): any {
    throw "Must be implemented by subclass";
  }

  runAll(objs: GraphObjDef[]): IReturnValue[] {
    const mapFn = this.mapObj.bind(this);
    return objs.map(mapFn);
  }
}
