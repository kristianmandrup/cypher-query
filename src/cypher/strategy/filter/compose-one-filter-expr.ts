import { CompositeFilterExpr, IFilterExpr } from "..";

export interface IComposeOneFilterExpr {
  setComposedFilter(filterExpr: IFilterExpr): IComposeOneFilterExpr;
}

export class ComposeOneFilterExpr
  extends CompositeFilterExpr
  implements IFilterExpr
{
  composedFilter?: IFilterExpr;

  setComposedFilter(filterExpr: IFilterExpr) {
    this.composedFilter = filterExpr;
    return this;
  }

  get filtersToReduce(): IFilterExpr[] {
    return this.composedFilter ? [this.composedFilter] : [];
  }
}
