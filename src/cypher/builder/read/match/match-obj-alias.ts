import { MatchObj } from "./match-obj";
import { Clause } from "../../clause";

export class MatchAlias extends Clause {
  obj(alias: string = "_") {
    return new MatchObj(this.q).config({ alias });
  }
}
