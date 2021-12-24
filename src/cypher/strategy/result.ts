import { GraphObjDef } from "../cypher-types";

export class Result {
  filtered: GraphObjDef[] = [];

  setFiltered(filtered: GraphObjDef[]) {
    this.filtered = filtered;
  }
}
