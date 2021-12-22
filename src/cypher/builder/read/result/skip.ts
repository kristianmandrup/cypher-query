import { Clause } from "../../clause";

export class Skip extends Clause {
  number(num: number) {
    this.results.splice(num);
  }
}
