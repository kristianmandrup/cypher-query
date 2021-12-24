import { IStrategyFilter, Result } from ".";

export interface ICypherStrategy {
  run(): any;
}

export class CypherStrategy implements IStrategy {
  filter?: IStrategyFilter;

  run() {
    const result = new Result();
    result.setFiltered(this.filter && this.filter.run());
  }
}
