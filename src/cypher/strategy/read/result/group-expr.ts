import { ReturnExpr } from "../return";

type itemAttrFn = (value: any) => any;

type itemAttrGrouper = itemAttrFn | string;

const groupBy = (list: any[], fn: itemAttrGrouper) =>
  list.reduce((acc, value) => {
    const rfn: itemAttrFn =
      typeof fn === "function" ? fn : (val: any) => val[fn];
    // Group initialization
    if (!acc[rfn(value)]) {
      acc[rfn(value)] = [];
    }

    // Grouping
    acc[rfn(value)].push(value);

    return acc;
  }, {});

export const createGroupExpr = (config?: any) => new GroupExpr().config(config);

export class GroupExpr extends ReturnExpr {
  key: itemAttrGrouper = "label";

  run() {
    if (!this.hasValidResults(this.queryResult)) {
      return this.queryResult;
    }
    this.queryResult.data = groupBy(this.queryResult.data, this.key);
    return this.queryResult;
  }
}
