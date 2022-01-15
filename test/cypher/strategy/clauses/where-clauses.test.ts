import { CypherStrategy, WhereClause, WhereClauses } from "../../../../src";

const context = describe;

describe("WhereClauses", () => {
  let strategy, clauses;

  const createClauses = () => new WhereClauses(strategy);
  const createClause = () => new WhereClause(strategy);

  beforeEach(() => {
    strategy = new CypherStrategy();
    clauses = createClauses();
  });

  describe("addClause", () => {
    context("valid where clause", () => {
      it("adds a single clause", () => {
        const clause = createClause();
        clauses.addClause(clause);
        expect(clauses.count).toEqual(1);
      });
    });
  });

  describe("isValid", () => {
    context("valid clause", () => {
      it("adds a single clause", () => {
        const clause = createClause();
        const valid = clauses.isValid(clause);
        expect(valid).toBeTruthy();
      });
    });
  });

  describe("optional and must", () => {
    beforeEach(() => {
      const clause = createClause();
      clauses.addClause(clause);
    });

    context("added single valid where clause", () => {
      it("has no optional clauses", () => {
        expect(clauses.optional.length).toEqual(0);
      });

      it("has one must clause", () => {
        expect(clauses.must.length).toEqual(1);
      });
    });
  });
});
