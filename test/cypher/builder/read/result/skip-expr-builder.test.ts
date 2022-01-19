import { CypherStrategy, createSkipExprBuilder } from "../../../../../src";

const context = describe;

describe("SkipExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createSkipExprBuilder(strategy, {});
  });

  describe("by", () => {
    it("set skip by", () => {
      expr.by(5);
      expect(expr).toBeDefined();
    });
  });
});
