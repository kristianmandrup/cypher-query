import {
  createNodePropGtExpr,
  GraphologyObjApi,
  StrategyFilter,
} from "../../../../../src";

describe("NodePropGtExpr", () => {
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
    expr = createNodePropGtExpr(filter, configObj);
  });

  describe("compareValue: 5", () => {
    describe("not equal", () => {
      beforeEach(() => {
        expr.setPropValue(5).setEqual(false);
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

    describe("equal", () => {
      beforeEach(() => {
        expr.setPropValue(5).setEqual(true);
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
