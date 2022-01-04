import { AndCompositeFilterResult } from "../../../../../../src";

const context = describe;

describe("AndCompositeFilterResult", () => {
  let fr: AndCompositeFilterResult;

  const female30 = { props: { sex: "female", age: 30 } };
  const male14 = { props: { sex: "male", age: 14 } };
  const male21 = { props: { sex: "male", age: 21 } };
  const male17 = { props: { sex: "male", age: 17 } };

  beforeEach(() => {
    fr = new AndCompositeFilterResult();
  });

  context("no matched results", () => {
    describe("addResult", () => {
      beforeAll(() => {
        fr.addResult([female30]);
      });

      it("adds result", () => {
        expect(fr.results).toEqual([female30]);
      });
    });

    describe("flatResult", () => {
      beforeAll(() => {
        fr.addResult([female30]);
        fr.addResult([male21]);
      });

      it("returns flat result", () => {
        expect(fr.flatResult()).toEqual([female30, male21]);
      });
    });
  });

  context("some matched results", () => {});
});
