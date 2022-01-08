import { IStrategyResult } from "../../../cypher-types";
import { BuilderClause } from "../../clause";

export interface IReturnNumberClause {
  number(num: number): IReturnNumberClause;
}

export class ReturnNumberClause extends BuilderClause {
  result?: IStrategyResult;

  protected isValidNumber(num: number) {
    return num && num >= 0;
  }

  number(num: number) {
    if (!this.result) {
      this.error("Missing results to limit");
      return;
    }
    if (!this.isValidNumber(num)) {
      this.error("Invalid number");
      return;
    }
    return this;
  }
}
