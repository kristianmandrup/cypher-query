import {
  AliasFilterExpr,
  CypherStrategy,
  ResultClause,
  ResultController,
  ReturnCountExpr,
} from "../../../../src";

const context = describe;

describe("ResultController", () => {
  let strategy, controller;

  // const createClauses = () => new MatchClauses(strategy);
  const createClause = () => new ResultClause(strategy);
  const createController = () => new ResultController(strategy);

  beforeEach(() => {
    strategy = new CypherStrategy();
    controller = createController();
  });

  describe("clauses", () => {
    it("has clauses", () => {
      expect.any(controller.clauses.length).toEqual(0);
    });
  });

  describe("addClause", () => {
    beforeEach(() => {
      const clause = createClause();
      controller.addClause(clause);
    });

    it("clauses has a single clause", () => {
      expect.any(controller.clauses.length).toEqual(1);
    });
    context("single clause", () => {
      describe("setAliasFilterExpr", () => {
        it("adds expression to clause", () => {
          const aliasExpr = new AliasFilterExpr();
          controller.setAliasFilterExpr(aliasExpr);
          const { current } = controller.clauses;
          expect.any(current.aliasFilterExpr).toBe(aliasExpr);
        });
      });

      describe("addExpressions", () => {
        it("adds expression to clause", () => {
          const expr = new ReturnCountExpr();
          controller.addExpressions(expr);
          const { current } = controller.clauses;
          expect.any(current.expressions.length).toEqual(1);
        });
      });
    });
  });
});
