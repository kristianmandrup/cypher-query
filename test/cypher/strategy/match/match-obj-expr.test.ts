import {
  MatchObjExpr,
  StrategyFilter,
  GraphologyObjApi,
  createMatchObjExpr,
} from "../../../../src";

import { audi, michael } from "../../fixtures";

const context = describe;

describe("MatchObjExpr", () => {
  let expr: MatchObjExpr;
  let config: any;

  // { alias: "p", label: "person" }
  context("person: michael", () => {
    beforeEach(() => {
      config = {
        alias: "p",
        labels: ["person"],
        props: {},
      };
      expr = createMatchObjExpr(config);
    });

    let map;
    describe("runAll", () => {
      beforeEach(() => {
        map = {
          persons: [michael, audi],
        };
      });
      it("michael is a person", () => {
        const result = expr.runAll(map.persons);
        expect(result).toEqual([michael]);
      });

      it("audi is not a person", () => {
        const result = expr.runAll([audi]);
        expect(result).toEqual([undefined]);
      });
    });

    describe("run", () => {
      it("michael is a person", () => {
        const result = expr.run(michael);
        expect(result).toEqual(michael);
      });

      it("audi is not a person", () => {
        const result = expr.run(audi);
        expect(result).toEqual(undefined);
      });
    });
  });

  context("car: audi", () => {
    beforeEach(() => {
      config = {
        alias: "c",
        labels: ["audi"],
        props: {},
      };
      expr = createMatchObjExpr(config);
    });

    describe("run", () => {
      it("michael is not a car", () => {
        const result = expr.run(michael);
        expect(result).toEqual(undefined);
      });

      it("audi is not a car", () => {
        const result = expr.run(audi);
        expect(result).toEqual(audi);
      });
    });
  });
});
