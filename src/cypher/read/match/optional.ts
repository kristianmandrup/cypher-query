import { AliasMap, Match, NodeDef, Props } from "../../..";
import { Clause } from "../../clause";

export class Optional extends Clause {
  get match() {
    return new Match(this.q).optional();
  }
}
