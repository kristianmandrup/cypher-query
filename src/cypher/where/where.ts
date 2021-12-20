import { Predicate } from "../predicate";
import { AndExpr, OrExpr } from "./boolean";

export class Where extends Predicate {
  nodePropMatches(
    node: any,
    propName: string,
    matchFn: (obj: any) => boolean
  ) {}

  nodePropEql(node: any, propName: string, propValue: any) {}

  nodePropNotEql(node: any, propName: string, propValue: any) {}

  nodePropLt(node: any, propName: string, propValue: any) {}

  nodePropGt(node: any, propName: string, propValue: any) {}

  get $or() {
    return new OrExpr(this);
  }

  get $and() {
    return new AndExpr(this);
  }
}
