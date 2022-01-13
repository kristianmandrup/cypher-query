import { ClauseBuilder } from "../clause";

export class Constraint extends ClauseBuilder {
  nodePropUnique(label: string, propName: string) {}

  relationPropUnique(label: string, propName: string) {}
}
