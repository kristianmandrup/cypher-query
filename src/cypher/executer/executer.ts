import { ICypherStrategy } from "..";
import { IGraphApi } from "../../adapters/graph-api";

export interface ICypherExecuter {
  run(): any;
}

export class CypherStrategyExecuter {
  strategy: ICypherStrategy;
  graphApi?: IGraphApi;

  constructor(strategy: ICypherStrategy, graphApi?: IGraphApi) {
    this.strategy = strategy;
    this.graphApi = graphApi;
  }

  setGraphApi(graphApi: IGraphApi) {
    this.graphApi = graphApi;
    return this;
  }

  run() {
    return this.strategy.run();
  }
}
