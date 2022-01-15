import { createResults, LimitExpr } from "../../../../src";

describe("LimitExpr", () => {
  let expr;
  beforeEach(() => {
    expr = new LimitExpr();
  });

  describe("setLimit(5)", () => {
    beforeEach(() => {
      expr.setLimit(5);
    });
    it("sets num to 5", () => {
      expect(expr.num).toEqual(5);
    });

    describe("run with 10 data rows", () => {
      beforeEach(() => {
        expr.setResults(createResults(10));
      });
      it("limits results to 5 rows", () => {
        expr.run();
        expect(expr.rows).toEqual(5);
        expect(expr.columns).toEqual(10);
        expect(expr.data[0]).toEqual({ id: 0 });
        expect(expr.data[4]).toEqual({ id: 4 });
      });
    });
  });
});
