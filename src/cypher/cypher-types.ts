export interface IQueryResult {
  header: string[];
  rows: any[];
  count: number;
}

export interface IResultExpr {
  results: IQueryResult;
}

export interface IStrategyResult {
  setFiltered(filtered: GraphObjDef[]): IStrategyResult;
  addExpr(expr: IResultExpr): IStrategyResult;
}

export interface AliasMap {
  [alias: string]: NodeDef;
}

export interface Props {
  [key: string]: any;
}

export interface StrMap {
  [key: string]: string;
}

export type RelSetArgs = {
  direction?: "from" | "to";
};

export type NodeRelOpts = {
  from?: NodeDef;
  to?: NodeDef;
  relation?: RelationDef;
};

export type GraphObjDef = {
  type?: string;
  alias?: string;
  labels?: string[];
  label?: string;
  props?: Props;
};

export interface NodeDef extends GraphObjDef {
  type?: "node";
}

export interface RelationDef extends GraphObjDef {
  type?: "edge";
}

export interface DirectedRelationDef extends RelationDef {
  direction?: "from" | "to";
}
