import { Match, Where } from "./read/match";
import { GunSchema, Props } from "..";
import { Return } from "./read";
import { Create } from "./write";

export const query = (ctx: GunSchema) => new Query(ctx);

export class Query {
  ctx: GunSchema;
  aliasMap: Props = {};

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

  get $create() {
    return new Create(this);
  }

  get $match() {
    return new Match(this);
  }

  get $where() {
    return new Where(this);
  }

  get $return() {
    return new Return(this);
  }
}
