import {
  CypherStrategy,
  createReturnAggregationExprBuilder,
} from "../../../../../src";

const context = describe;

describe("AggregationExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createReturnAggregationExprBuilder(strategy, {});
  });

  describe("matches", () => {
    it("adds sum expression", () => {
      expr.sum("salary");
      expect(expr).toBeDefined();
    });
  });
});
