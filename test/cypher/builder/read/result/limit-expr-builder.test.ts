import { CypherStrategy, createLimitExprBuilder } from "../../../../../src";

const context = describe;

describe("LimitExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createLimitExprBuilder(strategy, {});
  });

  describe("by", () => {
    it("set limit by", () => {
      expr.by(5);
      expect(expr).toBeDefined();
    });
  });
});
