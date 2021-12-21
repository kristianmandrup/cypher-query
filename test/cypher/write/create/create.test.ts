import { Query, GunSchema } from "../../../../src";
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
    describe("node", () => {
      it("creates node with an alias", () => {
        const alias = "X";
        query.create.node(alias);
      });

      it("creates anonymous node", () => {
        const alias = "X";
        const label = "x";
        const result = query.create.node({});
        expect(keysFor(result)).toEqual([]);
      });

      it("creates node with a label", () => {
        const alias = "X";
        const label = "x";
        const result = query.create.node({ alias, label });
        expect(keysFor(result)).toEqual(["X"]);
        expect(labelFor("X", result)).toEqual(label);
      });

      it("creates node with a label and props", () => {
        const alias = "X";
        const label = "x";
        const props = { x: 2 };
        const result = query.create.node({ alias, label, props });
        expect(keysFor(result)).toEqual(["X"]);
        expect(labelFor("X", result)).toEqual(label);
        expect(propsFor("X", result)).toEqual(props);
      });

      it("creates node with multiple labels", () => {
        const alias = "X";
        const labels = ["x", "xx"];
        const result = query.create.node({ alias, labels });
        expect(keysFor(result)).toEqual(["X"]);
        expect(labelsFor("X", result)).toEqual(labels);
      });

      it("creates node with a single label when supplying single and multiple labels", () => {
        const alias = "X";
        const label = "x";
        const labels = ["x", "xx"];
        const result = query.create.node({ alias, labels });
        expect(keyFor(result)).toEqual("X");
        expect(labelsFor("X", result)).toEqual([label]);
      });
    });

    describe("nodes", () => {
      it("creates multiple nodes", () => {
        const xlabels = ["x", "xx"];
        const nodes = [
          {
            alias: "X",
            labels: xlabels,
            props: { x: 1 },
          },
          {
            alias: "Y",
            label: "y",
            props: { y: 2 },
          },
        ];
        const result = query.$create.nodes(nodes);
        expect(keyFor(result)).toEqual(["X", "Y"]);
        expect(labelsFor("X", result)).toEqual(xlabels);
        expect(labelFor("Y", result)).toEqual("y");
      });
    });

    describe("relation", () => {
      it("creates nodes with a relationship between them", () => {
        const fromNode = {
          alias: "X",
          label: "x",
        };
        const toNode = {
          alias: "Y",
          label: "y",
        };
        const friendRelation = {
          alias: "FRIEND",
          label: "friend",
        };
        query.create.relation(fromNode, friendRelation, toNode);
      });
    });
  });
});
