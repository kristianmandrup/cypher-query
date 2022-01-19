import {
  CypherStrategy,
  createReturnCountExprBuilder,
} from "../../../../../src";

const context = describe;

describe("CountExprBuilder", () => {
  let strategy, exprBuilder, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    exprBuilder = createReturnCountExprBuilder(strategy, { alias: "animals" });
    expr = exprBuilder.expr;
  });

  describe("distinct", () => {
    it("count distinct animals", () => {
      exprBuilder.distinct();
      expect(expr).toBeDefined();
    });
  });
});
