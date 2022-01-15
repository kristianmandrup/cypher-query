import {
  AliasFilterExpr,
  CypherStrategy,
  ResultClause,
  ClauseType,
} from "../../../../src";

const context = describe;

describe("ResultClause", () => {
  let strategy, clause;
  beforeEach(() => {
    strategy = new CypherStrategy();
    clause = new ResultClause(strategy);
  });

  describe("createExpression", () => {
    it("creates expression", () => {
      const config = {};
      const expr = clause.createExpression("x", config);
      expect(expr).toBeDefined();
    });
  });

  describe("addAsExpression", () => {
    context("single valid expression", () => {
      it("creates and adds expression", () => {
        const config = {};
        const expr = clause.addAsExpression("x", config);
        expect(expr).toBeDefined();
      });
    });
  });

  describe("addExpressions", () => {
    context("single valid expression", () => {
      it("adds expressions", () => {
        const config = {};
        const expr = clause.createExpression("obj", config);
        clause.addExpressions(expr);
        expect(clause.current).toBe(expr);
      });
    });
  });

  describe("setAliasFilterExpr", () => {
    it("sets alias filter expression", () => {
      const aliasFilterExpr = new AliasFilterExpr();
      clause.setAliasFilterExpr(aliasFilterExpr);
      expect(clause.aliasFilterExpr).toBe(aliasFilterExpr);
    });
  });

  describe("type", () => {
    it("is match", () => {
      expect(clause.type).toBe(ClauseType.return);
    });
  });

  describe("typeName", () => {
    it("is match", () => {
      expect(clause.typeName).toBe("match");
    });
  });
});
