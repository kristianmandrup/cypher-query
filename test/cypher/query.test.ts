import { Query, GunSchema } from "../../src";
import Gun from "gun";

describe("Query", () => {
  let query, ctx, gun;
  beforeEach(() => {
    gun = Gun();
    ctx = new GunSchema(gun);
    query = new Query(ctx);
  });

  const aliasKeysFor = (query, name = "alias") =>
    Object.keys(query.aliasMap[name]);
  const keyFor = (res) => keysFor(res)[0];
  const keysFor = (res) => Object.keys(res);
  const labelsFor = (alias, res) => res[alias]["__labels"];
  const labelFor = (alias, res) => labelsFor(alias, res)[0];
  const propsFor = (alias, res) => res[alias]["__props"];

  describe("create", () => {
    it("has a node method", () => {
      expect(query.create.node).toBeDefined();
    });

    it("has a nodes method", () => {
      expect(query.create.nodes).toBeDefined();
    });
  });

  describe("match", () => {
    it("has a nodes method", () => {
      expect(query.match.nodes).toBeDefined();
    });
  });
});
