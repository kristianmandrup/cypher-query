import { CompositeFilterResult, IComposeOneFilterExpr } from "..";
import { GraphObjDef } from "../../../cypher-types";
import { ComposeOneFilterExpr } from "../compose-one-filter-expr";

export const createNotFilterExpr = (config?: any) =>
  new NotFilterExpr().config(config);

export class NotCompositeFilterResult extends CompositeFilterResult {
  composedResult(): GraphObjDef[] {
    return this.combinedResults;
  }
}

export interface INotFilterExpr extends IComposeOneFilterExpr {}

export class NotFilterExpr extends ComposeOneFilterExpr {
  createCompositeResult() {
    return new NotCompositeFilterResult();
  }

  inverse(results: any[]): GraphObjDef[] {
    return this.setOps.difference(results, this.matchedResults);
  }

  run(obj: any): GraphObjDef | undefined {
    return this.runAll([obj])[0];
  }

  runAll(objs: any): GraphObjDef[] {
    const { composedFilters } = this;
    if (!composedFilters || composedFilters.length === 0) {
      this.error("Missing composed filters");
      return [];
    }
    const results = this.runComposed(objs);
    return this.inverse(results);
  }
}
