import { CypherStrategy, createSkipExprBuilder } from "../../../../../src";

const context = describe;

describe("SkipExprBuilder", () => {
  let strategy;
  beforeEach(() => {
    strategy = new CypherStrategy();
  });

  describe("strategy expr", () => {
    let exprBuilder, expr;
    beforeEach(() => {
      exprBuilder = createSkipExprBuilder(strategy, { by: 5 });
      expr = exprBuilder.expr;
    });

    it("is a skip expression", () => {
      expect(expr).toBeDefined();
      expect(expr.name).toEqual("skip");
    });

    describe("by", () => {
      it("set skip by", () => {
        exprBuilder.by(2);
        expect(expr.count).toEqual(2);
      });
    });
  });
});
