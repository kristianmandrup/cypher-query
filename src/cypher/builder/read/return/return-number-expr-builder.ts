import { ReturnExprBuilder } from ".";
import { IStrategyResult } from "../../../cypher-types";

export interface IReturnNumberExprBuilder {
  number(num: number): IReturnNumberExprBuilder;
}

export class ReturnNumberExprBuilder extends ReturnExprBuilder {
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
