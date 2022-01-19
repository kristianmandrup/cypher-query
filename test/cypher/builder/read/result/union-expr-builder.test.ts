import { CypherStrategy, createUnionExprBuilder } from "../../../../../src";

const context = describe;

describe("UnionExprBuilder", () => {
  let strategy, expr;
  beforeEach(() => {
    strategy = new CypherStrategy();
    expr = createUnionExprBuilder(strategy, {});
  });

  describe("by", () => {
    it("set union with", () => {
      const resultSet = {};
      expr.with(resultSet);
      expect(expr).toBeDefined();
    });
  });
});
