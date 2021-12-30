import { Query, GunAPI } from "../../../../../src";
import Gun from "gun";

describe("Query", () => {
  let query, ctx, gun;
  beforeEach(() => {
    gun = Gun();
    ctx = new GunAPI(gun);
    query = new Query(ctx);
  });

  const keyFor = (res) => keysFor(res)[0];
  const keysFor = (res) => Object.keys(res);

  describe("delete", () => {
    describe("node", () => {
      it("deletes node with an alias", () => {
        const alias = "X";
        const node = query.create.node(alias);
        const result = query.delete.node(alias);
        expect(keyFor(result)).toEqual("X");
      });
    });
  });
});
