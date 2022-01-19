import { CypherStrategy, createLabelExprBuilder } from "../../../../../src";

const context = describe;

describe("LabelExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createLabelExprBuilder(strategy, {});
  });

  describe("city", () => {
    it("city", () => {
      expr.label("city");
      expect(expr).toBeDefined();
    });
  });
});
