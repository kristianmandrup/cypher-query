import { IStrategyResult } from "../../../cypher-types";
import { BuilderClause } from "../../clause";

export class ReturnClause extends BuilderClause {
  result?: IStrategyResult;
}
