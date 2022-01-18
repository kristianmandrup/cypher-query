import {
  CypherStrategy,
  createReturnPropExprBuilder,
} from "../../../../../src";

const context = describe;

describe("PropExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createReturnPropExprBuilder(strategy, {});
  });

  describe("city", () => {
    it("city", () => {
      expr.prop("city");
      expect(expr).toBeDefined();
    });
  });
});
