import { CypherStrategy, createLimitExprBuilder } from "../../../../../src";

const context = describe;

describe("LimitExprBuilder", () => {
  let strategy, exprBuilder;
  beforeEach(() => {
    strategy = new CypherStrategy();
  });

  describe("strategy expr", () => {
    let expr;
    beforeEach(() => {
      exprBuilder = createLimitExprBuilder(strategy, { by: 5 });
      expr = exprBuilder.expr;
    });

    it("is a limit expression", () => {
      expect(expr).toBeDefined();
      expect(expr.name).toEqual("limit");
    });

    describe("by", () => {
      it("set limit by", () => {
        exprBuilder.by(2);
        expect(expr.number).toEqual(2);
      });
    });
  });
});
