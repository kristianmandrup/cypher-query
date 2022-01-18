import { CypherStrategy, WhereClauseBuilder } from "../../../../../src";

const context = describe;

describe("WhereClauseBuilder", () => {
  let strategy, clause;
  beforeEach(() => {
    strategy = new CypherStrategy();
    clause = new WhereClauseBuilder(strategy);
  });

  describe("or", () => {
    it("creates or clause", () => {
      const expr = clause.or;
      expect(expr).toBeDefined();
    });
  });

  describe("and", () => {
    it("creates and clause", () => {
      const expr = clause.and;
      expect(expr).toBeDefined();
    });
  });

  describe("not", () => {
    it("creates not clause", () => {
      const expr = clause.not;
      expect(expr).toBeDefined();
    });
  });
});
