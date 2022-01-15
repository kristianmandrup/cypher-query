import {
  StrategyFilter,
  GraphologyObjApi,
  IGraphObjApi,
  createNotFilterExpr,
  NotFilterExpr,
  NodePropGtExpr,
} from "../../../../../../src";

const context = describe;

describe("NotFilterExpr", () => {
  let expr: NotFilterExpr;
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
    expr = createNotFilterExpr(filter, configObj);
  });

  describe("compareValue: 5", () => {
    let adultFilter = new NodePropGtExpr(filter).config({
      propName: "age",
      propValue: 18,
      equal: true,
    });

    context("NO males > 18", () => {
      beforeEach(() => {
        expr.matchedResults = [female30, male14, male17];
        expr.setComposedFilter(adultFilter);
      });
      it("returns all 3 results", () => {
        const result = expr.run();
        expect(result.length).toBe(3);
        expect(result).toEqual([female30, male14, male17]);
      });
    });

    context("one male > 18", () => {
      beforeEach(() => {
        expr.matchedResults = [female30, male14, male21];
        expr.setComposedFilter(adultFilter);
      });
      it("returns all except for male over 18", () => {
        const result = expr.run();
        expect(result.length).toBe(2);
        expect(result).toEqual([female30, male14]);
      });
    });
  });
});
