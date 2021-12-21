import { Clause } from "../../../clause";
import { AndExpr, NotExpr, OrExpr } from "./boolean";

export class Where extends Clause {
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

  get $not() {
    return new NotExpr(this);
  }
}
