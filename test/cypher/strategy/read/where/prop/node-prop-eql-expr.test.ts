import {
  createNodePropEqlExpr,
  GraphologyObjApi,
  StrategyFilter,
} from "../../../../../src";

describe("NodePropEqlExpr", () => {
  let expr;
  let api: any;
  let configObj: any;
  let graphObjApi, filter;
  beforeEach(() => {
    api = {};
    graphObjApi = new GraphologyObjApi(); //
    filter = new StrategyFilter(graphObjApi);
    configObj = {
      node: {},
      propName: "a",
      propValue: "1",
    };
    expr = createNodePropEqlExpr(filter, configObj);
  });

  describe("compareValue: 5", () => {
    describe("eql", () => {
      beforeEach(() => {
        expr.setPropValue(5).setNot(false);
      });
      it("5 to 5 - true", () => {
        const result = expr.compareValue(5, 5);
        expect(result).toBeTruthy();
      });

      it("5 to 4 - false", () => {
        const result = expr.compareValue(5, 4);
        expect(result).toBeFalsy();
      });
    });

    describe("not", () => {
      beforeEach(() => {
        expr.setPropValue(5).setNot(true);
      });
      it("5 to 5 - true", () => {
        const result = expr.compareValue(5, 5);
        expect(result).toBeFalsy();
      });

      it("5 to 4 - false", () => {
        const result = expr.compareValue(5, 4);
        expect(result).toBeTruthy();
      });
    });
  });
});
