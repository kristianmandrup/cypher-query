import { Create, GunSchema } from "..";

export const query = (ctx: GunSchema) => new Query(ctx);

export class Query {
  ctx: GunSchema;

  constructor(ctx: GunSchema) {
    this.ctx = ctx;
  }

  get create() {
    return new Create(this.ctx);
  }
}
