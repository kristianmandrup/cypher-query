import {
  CypherStrategy,
  WhereClause,
  ClauseType,
  AliasFilterExpr,
  FilterExpr,
  NodeLabelMatchesExpr,
  WhereClauses,
} from "../../../../src";

const context = describe;

describe("WhereClause", () => {
  let strategy, clause;
  beforeEach(() => {
    strategy = new CypherStrategy();
    clause = new WhereClause(strategy);
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

  describe("current", () => {
    context("no expressions", () => {
      it("is undefined", () => {
        expect(clause.typeName).toBe("match");
      });
    });

    context("one expression", () => {
      it("is last expression", () => {
        const expr1 = new NodeLabelMatchesExpr();
        clause.addExpressions(expr1);
        expect(clause.current).toBe(expr1);
      });
    });

    context("two expressions", () => {
      it("is last expression", () => {
        const expr1 = new NodeLabelMatchesExpr();
        const expr2 = new NodeLabelMatchesExpr();
        clause.addExpressions(expr1, expr2);
        expect(clause.current).toBe(expr2);
      });
    });
  });

  describe("map", () => {
    it("is a map", () => {
      expect(clause.map).toBeDefined();
    });
  });

  describe("setContainer", () => {
    it("sets container and map will be defined", () => {
      const container = new WhereClauses(strategy);
      clause.setContainer(container);
      expect(clause.map).toBeDefined();
    });
  });

  describe("findMatchingMapKey", () => {
    context("bad key", () => {
      it("no key found", () => {
        const found = clause.findMatchingMapKey("bad");
        expect(found).toBeFalsy();
      });
    });

    context("existing key", () => {
      it("finds key", () => {
        const found = clause.findMatchingMapKey("and");
        expect(found).toBeTruthy();
      });
    });
  });

  describe("findMatchingMapKey", () => {
    context("bad key", () => {
      it("no sub map found", () => {
        const exprMap = clause.findExprMapForKey("bad");
        expect(exprMap).toBe(clause.map);
      });
    });

    context("existing key", () => {
      it("sub map found", () => {
        const exprMap = clause.findExprMapForKey("bad");
        expect(exprMap).toBeDefined();
        expect(exprMap).not.toBe(clause.map);
      });
    });
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
});
