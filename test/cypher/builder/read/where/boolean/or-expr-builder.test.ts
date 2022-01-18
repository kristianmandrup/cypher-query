import { CypherStrategy, OrExprBuilder } from "../../../../../../src";

const context = describe;

describe("OrExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = new OrExprBuilder(strategy);
  });

  describe("matches", () => {
    it("adds expressions under or expr", () => {
      expr.matches({ city: "amsterdam" }).matches({ age: { gte: 18 } });
      expect(expr).toBeDefined();
    });
  });
});
