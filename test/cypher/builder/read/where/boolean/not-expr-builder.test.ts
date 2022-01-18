import { CypherStrategy, NotExprBuilder } from "../../../../../../src";

const context = describe;

describe("NotExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = new NotExprBuilder(strategy);
  });

  describe("matches", () => {
    it("adds expressions under not expr", () => {
      expr.matches({ city: "amsterdam" }).matches({ age: { gte: 18 } });
      expect(expr).toBeDefined();
    });
  });
});
