import Gun from "gun";
import {
  LocalGraph,
  QueryFind,
  QuerySearch,
  SelectTrav,
  TripTrav,
} from "./abstraction";
import { GunSchema } from "./schema";

export function sayHello() {
  console.log("hi");
}
export function sayGoodbye() {
  console.log("goodbye");
}

export const tryQueries = () => {
  const gun = Gun();
  const schema = new GunSchema(gun);
  const triple = { subject: "?p", predicate: "type", object: "Artist" };
  const trav = new TripTrav(triple);
  QuerySearch.search(schema, trav);

  const selection = { name: "Ice Cream" };
  const travSel = new SelectTrav(selection);
  QueryFind.find(schema, travSel);

  const lGraph = new LocalGraph();
  const test = lGraph.add({ id: "test1" });
  const obj = {
    name: "test",
    label: "person",
    birthdate: "07-05-1986",
    link: test,
  };
  const test0 = lGraph.add(obj);
};
