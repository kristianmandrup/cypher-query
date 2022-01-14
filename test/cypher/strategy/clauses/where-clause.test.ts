import {
  CypherStrategy,
  WhereClause,
  ClauseType,
  AliasFilterExpr,
} from "../../../../src";

const context = describe;

describe("WhereClause", () => {
  let strategy, clause;
  beforeEach(() => {
    strategy = new CypherStrategy();
    clause = new WhereClause(strategy);
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
      expect(clause.aliasFilter).toBe(aliasFilterExpr);
    });
  });

  describe("type", () => {
    it("is match", () => {
      expect(clause.type).toBe(ClauseType.match);
    });
  });

  describe("typeName", () => {
    it("is match", () => {
      expect(clause.typeName).toBe("match");
    });
  });
});
