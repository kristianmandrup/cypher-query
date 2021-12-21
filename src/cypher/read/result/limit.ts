import { Clause } from "../../clause";

export class Limit extends Clause {
  number(num: number) {
    this.results.splice(0, num);
  }
}
