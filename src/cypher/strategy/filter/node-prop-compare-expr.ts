import { FilterExpr } from "./filter-expr";

export class NodePropCompareExpr extends FilterExpr {
  propName?: string;
  propValue: any;

  setPropName(propName: string) {
    this.propName = propName;
    return this;
  }

  setPropValue(propValue: string) {
    this.propValue = propValue;
    return this;
  }

  isValid() {
    return (
      this.propName &&
      this.propName.trim().length &&
      this.isDefined(this.propValue)
    );
  }
}
