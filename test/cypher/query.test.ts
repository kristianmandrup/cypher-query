import { Query, GunSchema } from "../../src";
import Gun from "gun";

describe("Query", () => {
  let query, ctx, gun;
  beforeEach(() => {
    gun = Gun();
    ctx = new GunSchema(gun);
    query = new Query(ctx);
  });

  describe("create", () => {
    it("creates node with a label", () => {
      const alias = "x";
      query.$create.node(alias);
    });
  });
});
