import { IStrategyFilter, StrategyResult } from ".";
import { IGraphApi } from "../..";
import { GraphObjDef, IQueryResult } from "../cypher-types";

export interface ICypherStrategy {
  configure(config: any): ICypherStrategy;
  run(): IQueryResult;
}

export class CypherStrategy implements IStrategy {
  graphApi?: IGraphApi;
  filter?: IStrategyFilter;

  setGraphApi(graphApi: IGraphApi) {
    this.graphApi = graphApi;
    return this;
  }

  configure(config: any) {
    this.setGraphApi(config.graphApi);
    return this;
  }

  get filterTree() {
    return this.filter && this.filter.filterTree;
  }

  run(objs: GraphObjDef[]): IQueryResult {
    const filterTree = this.filterTree || {};
    const { matchExec, whereExec, returnExec } = filterTree as any;
    let aliasMap: any;
    if (matchExec) {
      aliasMap = matchExec.filter(objs);
    }
    if (whereExec) {
      whereExec.configure({ aliasMap });
      aliasMap = whereExec.filter(objs);
    }
    if (!returnExec) {
    }
    if (!aliasMap) {
    }
    return returnExec.process(aliasMap) as IQueryResult;
  }
}
