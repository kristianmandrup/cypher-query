import { ICypherStrategy } from "..";

export interface ICypherExecuter {
  run(): any;
}

export class CypherExecuter {
  strategy: ICypherStrategy;

  constructor(strategy: ICypherStrategy) {
    this.strategy = strategy;
  }

  run() {
    return {};
  }
}
