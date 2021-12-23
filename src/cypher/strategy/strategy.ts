export interface ICypherStrategy {
  run(): any;
}

export class CypherStrategy implements IStrategy {
  run() {
    return {};
  }
}
