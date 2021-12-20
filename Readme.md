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

const $q = query(gun);

$q.create.node("mike");
$q.create.node("mike", { label: "michael" });
$q.create.node("bob", { labels: ["bobby"], props: bobData });
$q.create.node("ava", { label: "avaria", props: bobData });
```
