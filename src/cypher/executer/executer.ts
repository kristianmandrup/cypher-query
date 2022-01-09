import { ICypherStrategy } from "..";

export interface ICypherExecuter {
  strategy: ICypherStrategy;
  configureStrategy(config: any): ICypherExecuter;
  run(): any;
}

export class CypherStrategyExecuter {
  strategy: ICypherStrategy;

  constructor(strategy: ICypherStrategy) {
    this.strategy = strategy;
  }

  configure(config: any) {
    this.strategy.configure(config);
    return this;
  }

  run() {
    return this.strategy.run();
  }
}
