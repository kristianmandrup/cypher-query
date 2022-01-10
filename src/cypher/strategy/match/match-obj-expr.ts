import { GraphObjDef, Props } from "../../cypher-types";

export interface ObjMatchConfigObj {
  alias?: string;
  labels?: string[];
  props?: Props;
}

export interface IMatchFilter extends IMatchObjExpr {}

export interface IMatchObjExpr {
  config(config: ObjMatchConfigObj): IMatchObjExpr;
}

export const createMatchObjExpr = (config: ObjMatchConfigObj) =>
  new MatchObjExpr().config(config);

export class MatchObjExpr {
  alias: string = "_";
  labels: string[] = [];
  props: Props = {};

  config(config: ObjMatchConfigObj) {
    const { alias, labels, props } = config;
    this.setAlias(alias);
    this.setLabels(labels);
    this.setProps(props);
    return this;
  }

  setAlias(alias: string = "_") {
    this.alias = alias;
    return this;
  }

  setLabels(labels: string[] = []) {
    this.labels = labels;
    return this;
  }

  setProps(props: Props = {}) {
    this.props = props;
    return this;
  }

  run(obj: any): GraphObjDef | undefined {
    return obj;
  }

  runAll(objs: GraphObjDef[]): GraphObjDef[] {
    return objs.reduce((acc: GraphObjDef[], obj) => {
      const result = this.run(obj);
      if (result) {
        acc.push(result);
      }
      return acc;
    }, []);
  }
}
