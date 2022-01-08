import { BuilderClause } from "../clause";

export class Constraint extends BuilderClause {
  nodePropUnique(label: string, propName: string) {}

  relationPropUnique(label: string, propName: string) {}
}
