import { GunAPI } from "..";

export const query = (ctx: GunAPI) => new Query(ctx);

export class Query {
  ctx: GunAPI;
  results: any[] = [];

  constructor(ctx: GunAPI) {
    this.ctx = ctx;
  }
}
