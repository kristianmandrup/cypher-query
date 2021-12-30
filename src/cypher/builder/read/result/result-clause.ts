import { IStrategyResult } from "../../../cypher-types";
import { Clause } from "../../clause";

export class ResultClause extends Clause {
  result?: IStrategyResult;
}
