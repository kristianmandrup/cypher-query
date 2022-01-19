import { CypherStrategy, createPropExprBuilder } from "../../../../../src";

const context = describe;

describe("PropExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createPropExprBuilder(strategy, {});
  });

  describe("city", () => {
    it("city", () => {
      expr.prop("city");
      expect(expr).toBeDefined();
    });
  });
});
