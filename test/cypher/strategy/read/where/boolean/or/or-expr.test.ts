import {
  StrategyFilter,
  GraphologyObjApi,
  IGraphObjApi,
  NodePropGtExpr,
  NodePropEqlExpr,
  OrFilterExpr,
  createOrFilterExpr,
} from "../../../../../../src";

const context = describe;

describe("OrFilterExpr", () => {
  let expr: OrFilterExpr;
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
    filter = new StrategyFilter(graphObjApi);
    configObj = {
      node: {},
      propName: "a",
      propValue: "1",
    };
    expr = createOrFilterExpr(filter, configObj);
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

    context("two males but NO males > 18", () => {
      beforeEach(() => {
        expr.matchedResults = [female30, male14, male17];
        expr.addFilter(adultFilter);
        expr.addFilter(maleFilter);
      });
      it("returns 2 males", () => {
        const result = expr.run();
        expect(result.length).toBe(2);
        expect(result).toEqual([male14, male17]);
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
        expect(result).toEqual([male14, male21]);
      });
    });
  });
});
