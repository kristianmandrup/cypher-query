import { Match, Where } from "./read/match";
import { GunSchema, Props } from "..";
import { Return } from "./return";
import { Create, Delete } from "./write";
import { Csv } from ".";

export const query = (ctx: GunSchema) => new Query(ctx);

export class Query {
  ctx: GunSchema;
  aliasMap: Props = {};
  results: any[] = [];

  constructor(ctx: GunSchema) {
    this.ctx = ctx;
  }

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
