import { FilterExpr, IFilterResult } from ".";
import { GraphObjDef } from "../../../cypher-types";

export class NodePatternExpr extends FilterExpr {
  pattern: any;

  config(pattern: any) {
    this.pattern = pattern;
  }

  matchPattern(obj: GraphObjDef) {
    return true;
  }

  filterObj(obj: GraphObjDef) {
    return this.matchPattern(obj);
  }

  runAll(objs: GraphObjDef[]): GraphObjDef[] {
    const filterFn = this.filterObj.bind(this);
    return objs.filter(filterFn);
  }
}
