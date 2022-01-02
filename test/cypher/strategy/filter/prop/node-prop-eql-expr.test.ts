import { createNodePropEqlExpr, NodePropEqlExpr } from "../../../../../src";

describe("LimitExpr", () => {
  let expr;
  let api: any;
  let configObj: any;
  beforeEach(() => {
    api = {};
    configObj = {
      node: {},
      propName: "a",
      propValue: "1",
    };
    expr = createNodePropEqlExpr(api)(configObj);
  });

  describe("compareEql: 5", () => {
    beforeEach(() => {
      expr.setPropValue(5).setNot(false);
    });
    it("5 to 5 - true", () => {
      const result = expr.compareEql(5, 5);
      expect(result).toBeTruthy();
    });

    it("5 to 4 - false", () => {
      const result = expr.compareNotEql(5, 4);
      expect(result).toBeFalsy();
    });
  });

  describe("compareNotEql: not 5", () => {
    beforeEach(() => {
      expr.setPropValue(5).setNot(true);
    });

    it("5 to 4 - true", () => {
      const result = expr.compareNotEql(5, 4);
      expect(result).toBeTruthy();
    });

    it("5 to 5 - false", () => {
      const result = expr.compareNotEql(5, 5);
      expect(result).toBeFalsy();
    });
  });
});
