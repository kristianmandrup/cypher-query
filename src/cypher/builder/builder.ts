import { Match, Where } from "./read/match";
import { Props } from "../cypher-types";
import { Return } from "./return";
import { Create, Delete } from "./write";
import { Csv } from "./load";

export interface IQueryBuilder {
  aliasMap: Props;
  mergeAliasMap(aliasMap: Props, name?: string): void;
}

export class QueryBuilder {
  aliasMap: Props = {};

  mergeAliasMap(aliasMap: Props, name = "alias") {
    this.aliasMap[name] = {
      ...(this.aliasMap[name] || {}),
      ...(aliasMap || {}),
    };
    return aliasMap;
  }

  get loadCsv() {
    return new Csv(this);
  }

  get create() {
    return new Create(this);
  }

  get delete() {
    return new Delete(this);
  }

  get match() {
    return new Match(this);
  }

  get where() {
    return new Where(this);
  }

  get return() {
    return new Return(this);
  }
}
