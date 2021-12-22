import { Clause } from "../clause";

export class Delete extends Clause {
  node(label: string) {}

  relation(label: string) {}

  nodes(...labels: string[]) {}

  relations(...labels: string[]) {}
}
