# DB query engine for Cypher (CQL)

Based on abstraction layer from [visualgraph](https://github.com/dletta/visualgraph/)

## Status

WIP

## Query Engine Architecture

The Query Engine is architected as a decoupled set of composable units that can be tested independently, re-architected or replaced.

The `Query` is responsible for exposing a builder object which can build a strategy that can be run from the query instance to return query results.

### Query Builder

The `QueryBuilder` is responsible for exposing a DSL for creating a Query Strategy to be executed on a GraphQL connection

### Query Strategy

The `QueryStrategy` is responsible for encapsulating the strategy being built by the builder.

## QueryStrategyExecuter

The `QueryStrategyExecuter` is responsible for executing a strategy on a given graph API, such as an API for an in-memory graph or a Graph API abstraction on GunDB.

The executer returns the Cypher query results either as a stream or as a `Promise` (ie. `async`).

## GraphDB Adapters

The query engine is be designed to support adapter for various GraphDBs

Currently this library aims to support:

- [graphology](https://graphology.github.io/)
- [gun](https://www.npmjs.com/package/gun)

The initial implementation will support a small subset of Cypher which can be extended by the community our to suit your particular use case.

The DSL query chain builder could further be extended with full string query support using [Chevrotain](https://github.com/Chevrotain/chevrotain) with a Cypher grammar, parser and generator.

### Creating adapters

To create an adapter for a given graph DB, the following APIs must be implemented

- `IGraphApi`
- `IGraphObjectApi`

Adapters for these interfaces are being developed for Graphology (in-memory) and GunDB (distributed graphs for Dapps) under `src/adapters`

#### Graph API

This API is used to operate on a the graph as a whole

- create graph objects (nodes, edges)
- traverse the graph
- find relationship patterns in the graph
- ...

The current API is designed for creating nodes and edges but will be extended

```ts
export interface IGraphApi {
  createNode(opts: NodeDef): any;
  createEdge(fromId: string, toId: string, edgeDef: RelationDef): any;
}
```

#### Graph Object API

This API is used to operate on a particular graph object (node or edge)

- access values
- update node values

The current API is read-only information gathering but will be extended

```ts
export interface IGraphObjApi {
  propValue(node: any, propName: string): any;
  nodeLabels(node: any): string[];
}
```

## Developing the API

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
create.node({ alias: "m" });
create.node({ alias: "m", label: "michael" });
create.node({ alias: "b", labels: ["bobby"], props: bobData });
create.node({ alias: "a", label: "avaria", props: { x: 2 } });
create.nodes([
  { alias: "a", label: "avaria", props: bobData },
  { alias: "b", labels: "bobby", props: { x: 3 } },
]);
```

### Match

```js
const q = query(gun);
const match = q.$match;
match.node({ alias: "a" });
match.node({ alias: "m", label: "michael" });
```

### Where

```js
const q = query(gun);
const where = q.$where;
where.obj("m").labels({ include: "Michael" });
where.obj("b").labels({ include: "person" });
where.obj("b").props({ age: gte(18), gender: eq("male") });
where.obj("a").labels({ include: "owns" });
```

Where `eq` and `gte` are simply convenience helpers for a more complex JSON structure:

`{ age: {gte: 18}, gender: {eq: "male"} }`

Not that more complex comnparison statements like not equal, can be expressed either as `neq` or `{not: eq: }`

Similarly `{ age: {ngte: 18}` or `{ age: {not: {gte: 18}}` is the same as `{ age: {lt: 18}`

The `Where` builders should build a `StrategyFilter` with filter expressions (`FilterExpr`).
The `StrategyFilter` is a composite. Any `FilterExpr` can itself be a composite, such as `AndExpr` and `OrExpr`. Each `FilterExpr` implementation must have a `run` method that runs the filter on a graph object (node or edge)

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

The Builder must be configured with an `IStrategyMap` object which contains a map of the factory maethods to create each type of strategy for the chainable builder DSL methods.

This makes the strategy completely configurable and composable, so that you can override, customize and extend with a strategy to fit your particular needs.

By default it calls `defaultStrategyMap` to generate a default strategy based on the default filter and result expressions provided.

```ts
export const defaultStrategyMap = (): IStrategyMap => {
  return {
    filter: {
      root: FilterRootFactoryFn;
      exprMap: {
        boolean: {
          and: FilterExprFactoryFn;
          or: FilterExprFactoryFn;
          not: FilterExprFactoryFn;
        }
        props: {
          eq: FilterExprFactoryFn;
          gt: FilterExprFactoryFn;
          lt: FilterExprFactoryFn;
        }
        labels: {
          include: FilterExprFactoryFn;
          match: FilterExprFactoryFn;
        }
      }
    };
    result: {
      root: ResultRootFactoryFn;
      exprMap: {
        limit: ResultExprFactoryFn;
        skip: ResultExprFactoryFn;
        union: ResultExprFactoryFn;
      }
    };
  };
};
```

### Matches

The matches should constitute a rough filter that is executed on the graph to build a rough `IFilterResult` result to be optionally further filtered with where.

```ts
export interface IFilterResult {
  [key: string]: GraphObjDef[];
}
```

Each key entry contains a list of matching graph objects for that key.
Matches filter on matching relationship patterns and matching labels and property values.

### Filters

The core of the Query engine is the concept of filters. Filters can be composed into a hierarchical structure of leafs and composites. Any filter must have a `run` method. Any filter filters on a single graph object (node or edge).

To filter the entire graph, a traversal strategy must be used to traverse the graph objects (such as Depth first or Breadth first) and them for each object encountered, it must be run through the filter to determine if this graph object should be part of the filter result set.

Each filter must prduce a filter result of type `IFilterResult`

```ts
export interface IFilterResult {
  [key: string]: GraphObjDef[];
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

#### Resolving boolean filter trees

The resolution operates relative to list of objects (previously matched) and the tree must determine which of these objects should still be in the result set.

Boolean operations use set operations to calculate the result, including: `union`, `difference` and `intersection`

The `AND` operations is the `intersection` of nodes for each of the sub expressions matches (ie. those nodes that are matched by ALL sub expressions that are part of the AND composition)

The `OR` operations is the distinct `union` (set addition) of nodes matched by ANY of the of sub expressions.

The `NOT` is the `difference` of the "incoming" list of matches with the nodes matched by the sub expression (ie. set subtraction).

A complex boolean filter may be structured in a tree like structure, like the following, which is evaluated depth first left to right.

```js
{
  filter: [{
    not: [{
      and: [{
        age: {gte: { ...}},
        name: {eq: { ... }}
      }],
    }],
    or: [{
      level: {gte: { ...}},
      status: {eq: { ... }}
    }]
  }]
}
```

So that the leaf expressions for the `and` expression would be evaluated first.

```js
  and: [{
    true (matching nodes),
    false (no matching nodes)
  }],
```

Logical `and` for `true` and `false` is `false`

```js
  not: [{
    false (ie. no matching nodes)
  }],
```

`not` on `false` (no matching nodes) means the inverse set, ie. all nodes in the graph

```js
  true (ie. return matching nodes NOT)
```

Then `or` expression is evaluated, resulting in first the leaf expressions

```js
  or: [{
    false (no matching nodes)
    true (matching nodes OR2)
  }]
```

Logical `or` for `false` and `true` is `true` returning the set labeled `OR2`

Resulting in a combined (union) result set of all nodes combined with `OR2`, ie. all nodes in the graph.

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
