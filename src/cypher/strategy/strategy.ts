import { IGraphApi } from "../..";
import { GraphObjDef, IQueryResult } from "../cypher-types";
import { IQueryController, QueryController } from "./controllers";

export interface ICypherStrategy {
  queryController: IQueryController;
  setGraphApi(graphApi: IGraphApi): ICypherStrategy;
  configure(config: any): ICypherStrategy;
  run(objs: GraphObjDef[]): IQueryResult;
}

export class CypherStrategy implements ICypherStrategy {
  graphApi?: IGraphApi;
  queryController: IQueryController = new QueryController();

  setGraphApi(graphApi: IGraphApi) {
    this.graphApi = graphApi;
    return this;
  }

  configure(config: any) {
    this.setGraphApi(config.graphApi);
    return this;
  }

  run(objs: GraphObjDef[]): IQueryResult {
    const controller = this.queryController;
    const { matchExec, whereExec, returnExec } = controller as any;
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
