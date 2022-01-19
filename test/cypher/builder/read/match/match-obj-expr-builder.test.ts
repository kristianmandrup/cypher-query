import { CypherStrategy, createMatchObjExprBuilder } from "../../../../../src";

const context = describe;

describe("MatchObjExprBuilder", () => {
  let strategy, exprBuilder;
  beforeEach(() => {
    strategy = new CypherStrategy();
  });

  describe("strategy expr", () => {
    let expr;
    beforeEach(() => {
      exprBuilder = createMatchObjExprBuilder(strategy, { alias: "a" });
      expr = exprBuilder.expr;
    });

    it("is an expression", () => {
      expect(expr).toBeDefined();
      expect(expr.name).toEqual("obj");
    });
  });
});
