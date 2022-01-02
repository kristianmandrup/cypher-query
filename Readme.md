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

## CypherStrategyExecuter

The `CypherStrategyExecuter` is responsible for executing a strategy on a given graph API, such as an API for an in-memory graph or a Graph API abstraction on GunDB.

The executer returns the Cypher query results either as a stream or as a `Promise` (ie. `async`).

## GraphDB Adapters

The Cypher query engine will be designed to support an adapter for a GraphDB

Currently this library aims to support:

- [graphology](https://graphology.github.io/)
- [gun](https://www.npmjs.com/package/gun)

The initial implementation will support a small subset of Cypher which can be extended by the community our to suit your particular use case.

The DSL query chain builder could further be extended with full string query support using [Chevrotain](https://github.com/Chevrotain/chevrotain) with a Cypher grammar, parser and generator.

## Cypher API

The Cypher Query Engine will be developed starting from result and step by step back to match.

It should be developed interface first, starting with the executer, then startegy and finally the builder to build the strategy.

## APIs under development

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

```js
const q = query(gun);
const match = q.$match;
match.node({ alias: "mike" });
match.node({ alias: "mike", label: "michael" });
```

### Where

```js
const q = query(gun);
const where = q.$where;
where.node("mike").labels({ include: "Michael" });
where.node.labels({ include: "person" });
where.node.props({ age: gte(18), gender: eq("male") });
where.edge.labels({ include: "owns" });
```

The Where builders should build a `Filter` with filter expressions (`FilterExpr`).
The `Filter` is a composite. Any `FilterExpr` can itself be a composite, such as `AndExpr` and `OrExpr`. Each `FilterExpr` implementation must have a `run` method that runs the filter on a graph object (node or edge)

Any alias referenced (such as `mike` in the above example) must be matched in the alias map created using a previous `Match` builder.

### Return

`Return` builds a map of what exactly is returned from the nodes matched in the filters (`Where`).

```js
const q = query(gun);
const match = q.match;
match.node({ alias: "mike" });
return q.return.node({ alias: "mike" });
```

Any alias referenced (such as `mike` in the above example) must be matched in the alias map created using a previous `Match` builder (same as for Where).

`Return` optionally return results grouped by label (default). It returns a `result` which adheres to the following interface:

```js
IQueryResult {
  headers: string[];
  data: any[];
  rows: number;
  columns: number;
}
```

Sample result:

```js
{
  headers: ['age', 'name'],
  data: [
    {'32', 'Michael'},
    {'24', 'Anna'},
    {'7', 'Ricky'},
  ]
}
```

`result.rows` would return 3 (since 3 rows in `data`) and `result.columns` would return 2 (since 2 header values in `headers`).

## Strategy API

### Filters

The core of the Query engine is the concept of filters. Filters can be composed into a hierarchical structure of leafs and composites. Any filter must have a `run` method. Any filter filters on a single graph object (node or edge).

To filter the entire graph, a traversal strategy must be used to traverse the graph objects (such as Depth first or Breadth first) and themn for each object encountered, it must be run through the filter to determine if this graph object should be part of the filter result set.

Each filter must prduce a filter result of type `IFilterResult`

```ts
export interface IFilterResult {
  [key: string]: any[];
}
```

#### Composite filters

The `Filter` class contains a `run` method of the following form

```ts
  run() {
    this.result = this.filterAll(this.objs);
    return this;
  }
```

The abstract class `FilterExpr` contains a placeholder `run` method which returns an empty result

```ts
  run(): IFilterResult {
    return {};
  }
```

Filter epxression should subclass this abstract baseclass and provide a run method which returns a `IFilterResult`.

Note: When we get to support the GunDB API, this API will need to be promise based.

As the filters are run, a results list will be returned on each tree node in the filter hierarchy, which must then be assembled into the final flat result format, each set of results linked to a match alias.

##### Label filters

Label filters filter on graph object labels. Currently the filters implemented support:

- Includes label via `String.includes`
- Matches label (RegExp `match`)

##### Prop filters

Prop filters filter on graph object props. Currently the filters implemented support:

- Equality (`===` and `!==`)
- Greater than (`>` and `>=`)
- Less than (`<` and `<=`)

##### Node Filters

The `PatternExpr` filter will match if a given complex node pattern can be identified, such as Node `A` related to Node `B` via Edge with label `owns`.

##### Converting Filter results to Query results

The `FilterResultConverter` class can be used to convert an `IFilterResult` to an `IQueryResult`

### Results

The filter results will be passed to the `Results` builder after conversion via `FilterResultConverter`

The `Results` class can then use various result expressions to futher limit or reorganise the results before final return and presentation.

Current `ResultExpr` implementations include

- `LimitExpr` limit result data rows returned
- `SkipExpr` skip initial result data rows returned
- `UnionExpr` unite two sets of results into one (if they share same headers)

Results are of the form `IQueryResult`

```js
IQueryResult {
  headers: string[];
  data: any[];
  rows: number;
  columns: number;
}
```

Sample result:

```js
{
  headers: ['age', 'name'],
  data: [
    {'32', 'Michael'},
    {'24', 'Anna'},
    {'7', 'Ricky'},
  ]
}
```
