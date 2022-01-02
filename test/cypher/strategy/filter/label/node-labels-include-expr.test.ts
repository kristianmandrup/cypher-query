import {
  createNodeLabelsIncludeExpr,
  NodeLabelsIncludeExpr,
} from "../../../../../src";

describe("NodeLabelsIncludeExpr", () => {
  let expr: NodeLabelsIncludeExpr;
  let api: any;
  let configObj: any;
  beforeEach(() => {
    api = {};
    configObj = {
      node: {},
      propName: "a",
      propValue: "1",
    };
    expr = createNodeLabelsIncludeExpr(api)(configObj);
  });

  describe("compareValue: 5", () => {
    describe("eql", () => {
      beforeEach(() => {
        expr.setLabel("a").setNot(false);
      });
      it("a to a - true", () => {
        const result = expr.compareValue(["a"], "a");
        expect(result).toBeTruthy();
      });

      it("a to b - false", () => {
        const result = expr.compareValue(["a"], "b");
        expect(result).toBeFalsy();
      });
    });

    describe("not", () => {
      beforeEach(() => {
        expr.setLabel("a").setNot(true);
      });
      it("a to a - false", () => {
        const result = expr.compareValue(["a"], "a");
        expect(result).toBeFalsy();
      });

      it("a to b - true", () => {
        const result = expr.compareValue(["a"], "b");
        expect(result).toBeTruthy();
      });
    });
  });
});
