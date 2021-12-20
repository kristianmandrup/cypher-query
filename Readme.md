# Gun DB query engine for Cypher (CQL)

Based on abstraction layer from [visualgraph](https://github.com/dletta/visualgraph/)

## Status

WIP

## Cypher API

### Create

```js
import { query } from "gun-cypher";

const bobData = {
  age: 32,
  firstname: "Bob",
  lastname: "Martin",
};

const q = query(gun);
const create = q.$create;
create.node("mike");
create.node("mike", { label: "michael" });
create.node("bob", { labels: ["bobby"], props: bobData });
create.node("ava", { label: "avaria", props: { x: 2 } });
create.nodes({
  ava1: { label: "avaria", props: bobData },
  bob1: { labels: "bobby", props: { x: 3 } },
});
```

### Match

WIP: TODO - combine with `Where` before executing

```js
const q = query(gun);
const match = q.$match;
match.node("mike");
match.node("mike", { label: "michael" });
```

WIP: Support async promise based search with `await`

```js
const result = await match.node("mike");
console.log(result);
```

### Where

WIP: TODO

```js
const q = query(gun);
const where = q.$where;
```

### Return

Looks up in `matches` alias map in query, generated via `match` queries

```js
const q = query(gun);
const match = q.$match;
match.node("mike");
return q.return.node("mike");
```
