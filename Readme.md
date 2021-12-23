# Gun DB query engine for Cypher (CQL)

Based on abstraction layer from [visualgraph](https://github.com/dletta/visualgraph/)

## Status

WIP

## Cypher Query Engine Architecture

The Cypher Query Engine is architected as a decoupled set of composable units that can be tested independently, re-architected or replaced.

The `Query` is responsible for exposing a builder object which can build a strategy that can be run from the query instance to return query results.

### CypherBuilder

The `QueryBuilder` is responsible for exposing a DSL for creating a Query strategy to be executed on a GraphQL connection

### CypherStrategy

The `CypherStrategy` is responsible for encapsulating the strategy being built by the builder.

## Executer

The `Executer` is responsible for executing a strategy on a given graph API, such as an API for an in-memory graph or a Graph API abstraction on GunDB.

The executer returns the Cypher query results either as a stream or as a `Promise` (ie. `async`).

## GraphDB Adapters

The Cypher query engine will be designed to support an adapter for a GraphDB

Currently we aim to support:

- [graphology](https://graphology.github.io/)
- [gun](https://www.npmjs.com/package/gun)

Graphology already comes with some baked-in [Neo4J support](https://www.npmjs.com/package/graphology-neo4j)

Graphology has a number of extensions such as [graphology-operators](https://www.npmjs.com/package/graphology-operators)

## Cypher API

TODO: Refactor to adhere to new architecture outline

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
create.node({ alias: "mike" });
create.node({ alias: "mike", label: "michael" });
create.node({ alias: "bob", labels: ["bobby"], props: bobData });
create.node({ alias: "ava", label: "avaria", props: { x: 2 } });
create.nodes([
  { alias: "ava", label: "avaria", props: bobData },
  { alias: "bob", labels: "bobby", props: { x: 3 } },
]);
```

### Match

WIP: TODO - combine with `Where` before executing

```js
const q = query(gun);
const match = q.$match;
match.node({ alias: "mike" });
match.node({ alias: "mike", label: "michael" });
```

WIP: Support async promise based search with `await`

```js
const result = await match.node({ alias: "mike" });
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
const match = q.match;
match.node({ alias: "mike" });
return q.return.node({ alias: "mike" });
```
