import {
  GraphologyObjApi,
  IGraphObjApi,
  NodePropGtExpr,
  NodePropEqlExpr,
  AndFilterExpr,
  createAndFilterExpr,
  // CypherStrategy,
} from "../../../../../../src";

const context = describe;

describe("AndFilterExpr", () => {
  let expr: AndFilterExpr;
  let api: any;
  let configObj: any;
  let filter;
  let graphObjApi: IGraphObjApi;

  const female30 = { props: { sex: "female", age: 30 } };
  const male14 = { props: { sex: "male", age: 14 } };
  const male21 = { props: { sex: "male", age: 21 } };
  const male17 = { props: { sex: "male", age: 17 } };

  beforeEach(() => {
    api = {};
    graphObjApi = new GraphologyObjApi(); //
    // strategy = new CypherStrategy();
    configObj = {
      node: {},
      propName: "a",
      propValue: "1",
    };
    expr = createAndFilterExpr(configObj);
  });

  describe("compareValue: 5", () => {
    let adultFilter = new NodePropGtExpr(filter).config({
      propName: "age",
      propValue: 18,
      equal: true,
    });
    let maleFilter = new NodePropEqlExpr(filter).config({
      propName: "sex",
      propValue: "male",
    });

    context("NO males > 18", () => {
      beforeEach(() => {
        expr.matchedResults = [female30, male14, male17];
        expr.addFilter(adultFilter);
        expr.addFilter(maleFilter);
      });
      it("returns empty result", () => {
        const result = expr.run();
        expect(result.length).toBe(0);
      });
    });

    context("one male > 18", () => {
      beforeEach(() => {
        expr.matchedResults = [female30, male14, male21];
        expr.addFilter(adultFilter);
        expr.addFilter(maleFilter);
      });
      it("returns single male over 18", () => {
        const result = expr.run();
        expect(result.length).toBe(1);
        expect(result).toEqual([{}]);
      });
    });
  });
});
