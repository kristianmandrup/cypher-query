import {
  CypherStrategy,
  createReturnPropExprBuilder,
} from "../../../../../src";

const context = describe;

describe("PropExprBuilder", () => {
  let strategy, exprBuilder, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    exprBuilder = createReturnPropExprBuilder(strategy, {});
    expr = exprBuilder.expr;
  });

  describe("city", () => {
    it("city", () => {
      exprBuilder.prop("city");
      expect(expr).toBeDefined();
    });
  });
});
