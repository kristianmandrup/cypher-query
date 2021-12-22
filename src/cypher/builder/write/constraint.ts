import { Clause } from "../clause";

export class Constraint extends Clause {
  nodePropUnique(label: string, propName: string) {}

  relationPropUnique(label: string, propName: string) {}
}
