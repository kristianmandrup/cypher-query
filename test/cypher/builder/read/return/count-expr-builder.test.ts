import {
  CypherStrategy,
  createReturnCountExprBuilder,
} from "../../../../../src";

const context = describe;

describe("CountExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createReturnCountExprBuilder(strategy, {});
  });

  describe("distinct", () => {
    it("count distinct animals", () => {
      expr.distinct();
      expect(expr).toBeDefined();
    });
  });
});
