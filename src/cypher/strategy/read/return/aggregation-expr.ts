import { ReturnExpr } from ".";
import { GraphObjDef } from "../../../cypher-types";

export const createAggregationExpr = (config?: any) =>
  new ReturnAggregationExpr().config(config);

export class ReturnAggregationExpr extends ReturnExpr {
  functionName: string = "sum";
  key: string = "";
  propName: string = "";

  functionMap: any = {
    sum: (acc: number, value: number) => (acc += value),
  };

  functionAliasMap: any = {
    avg: "sum",
  };

  transformMap: any = {
    avg: (result: any, data: any[]) => result / data.length,
  };

  get data() {
    return this.filterResult[this.key];
  }

  get fnName() {
    return this.functionAliasMap[this.functionName] || this.functionName;
  }

  get aggregateFn() {
    return this.functionMap[this.fnName];
  }

  get transformFn() {
    return this.transformMap[this.fnName];
  }

  run() {
    if (!this.hasValidResults(this.queryResult)) {
      return this.queryResult;
    }
    const result = this.data.reduce(this.aggregateFn, 0);
    return this.transformFn(result, this.data);
  }
}
