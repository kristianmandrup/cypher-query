import { CypherStrategy, AndExprBuilder } from "../../../../../../src";

const context = describe;

describe("AndExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = new AndExprBuilder(strategy);
  });

  describe("matches", () => {
    it("adds expressions under and expr", () => {
      expr.matches({ city: "amsterdam" }).matches({ age: { gte: 18 } });
      expect(expr).toBeDefined();
    });
  });
});
