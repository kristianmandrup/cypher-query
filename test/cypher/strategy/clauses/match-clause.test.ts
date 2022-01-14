import {
  AliasFilterExpr,
  CypherStrategy,
  MatchClause,
  // CypherStrategy,
} from "../../../../src";
import { ClauseType } from "../../../../src/cypher/strategy/enum";

const context = describe;

describe("MatchClause", () => {
  let strategy, matchClause;
  beforeEach(() => {
    strategy = new CypherStrategy();
    matchClause = new MatchClause(strategy);
  });

  describe("createExpression", () => {
    it("creates expression", () => {
      const config = {};
      const expr = matchClause.createExpression("x", config);
      expect(expr).toBeDefined();
    });
  });

  describe("addExpressions", () => {
    it("adds expressions", () => {
      const config = {};
      const expr = matchClause.createExpression("x", config);
      matchClause.addExpressions(expr);
      expect(matchClause.current).toBe(expr);
    });
  });

  describe("setAliasFilterExpr", () => {
    it("sets alias filter expression", () => {
      const aliasFilterExpr = new AliasFilterExpr();
      matchClause.setAliasFilterExpr(aliasFilterExpr);
      expect(matchClause.aliasFilter).toBe(aliasFilterExpr);
    });
  });

  describe("type", () => {
    it("is match", () => {
      expect(matchClause.type).toBe(ClauseType.match);
    });
  });

  describe("typeName", () => {
    it("is match", () => {
      expect(matchClause.typeName).toBe("match");
    });
  });
});
