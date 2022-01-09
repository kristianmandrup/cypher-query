import { IStrategyFilter, StrategyResult } from ".";

export interface ICypherStrategy {
  run(): any;
}

export class CypherStrategy implements IStrategy {
  filter?: IStrategyFilter;

  run() {
    const result = new StrategyResult();
    result.setFiltered(this.filter && this.filter.run());
  }
}
