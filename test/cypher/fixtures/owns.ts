import { michael, anna } from "./persons";
import { mazda, audi } from "./cars";

const michael_owns_audi = {
  type: "edge",
  labels: ["owns"],
  props: { since: 2016 },
  from: michael,
  to: audi,
};

const anna_owns_mazda = {
  type: "edge",
  labels: ["owns"],
  props: { since: 2012 },
  from: anna,
  to: mazda,
};

export { michael_owns_audi, anna_owns_mazda };
