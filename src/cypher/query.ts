import { GunSchema } from "..";

export const query = (ctx: GunSchema) => new Query(ctx);

export class Query {
  ctx: GunSchema;
  results: any[] = [];

  constructor(ctx: GunSchema) {
    this.ctx = ctx;
  }
}
