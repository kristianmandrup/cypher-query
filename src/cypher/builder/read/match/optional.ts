import { BuilderClause } from "../../clause";

export class Optional extends BuilderClause {
  get match() {
    return {};
    // return new Match(this.q).optional();
  }
}
