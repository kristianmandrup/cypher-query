import { createResults, SkipExpr } from "../../../../src";

describe("SkipExpr", () => {
  let expr;
  beforeEach(() => {
    expr = new SkipExpr();
  });

  describe("setSkip(5)", () => {
    beforeEach(() => {
      expr.setSkip(5);
    });
    it("sets num to 5", () => {
      expect(expr.num).toEqual(5);
    });

    describe("run with 10 data rows", () => {
      beforeEach(() => {
        expr.setResults(createResults(10));
      });
      it("skips first 5 rows", () => {
        expr.run();
        expect(expr.rows).toEqual(5);
        expect(expr.columns).toEqual(10);
        expect(expr.data[0]).toEqual({ id: 5 });
        expect(expr.data[4]).toEqual({ id: 9 });
      });
    });
  });
});
