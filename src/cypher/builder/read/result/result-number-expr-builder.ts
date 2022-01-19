import { IResultExprBuilder } from ".";
import { IStrategyResult } from "../../..";
import { NumberExprBuilder } from "../generic";

export interface IResultNumberExprBuilder extends IResultExprBuilder {
  number(num: number): IResultNumberExprBuilder;
}

export class ResultNumberExprBuilder extends NumberExprBuilder {
  result?: IStrategyResult;
}
