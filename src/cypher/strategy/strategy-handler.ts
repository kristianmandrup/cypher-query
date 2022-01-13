import { ICypherStrategy } from ".";
import { Handler } from "..";

export interface IStrategyHandler {
  strategy: ICypherStrategy;
}

export class StrategyHandler extends Handler {
  strategy: ICypherStrategy;

  constructor(strategy: ICypherStrategy) {
    super();
    this.strategy = strategy;
  }

  get strategyMap() {
    return this.strategy.strategyMap;
  }
}
