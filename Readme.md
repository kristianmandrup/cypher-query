# Graph DB Cypher query engine

A composable barebones Javascript Cypher (Neo4J) query implementation that can query a graph DB. Adapters for the following Graph DBs will be included.

- [graphology](https://graphology.github.io/)
- [gun](https://www.npmjs.com/package/gun)

## Status

WIP (currently working on Strategy layer - filters)

Any community assistance much appreciated :)

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

## Architecture

The current target architecture looks roughly as follows:

![Cypher Query Architecture](./docs/images/cypher-query-architecture.jpeg "Cypher Query Architecture")

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

The `Where` builders should build a `WhereClause` with filter expressions (`FilterExpr`).

Any `FilterExpr` can itself be a composite, such as `AndExpr` and `OrExpr`. Each `FilterExpr` implementation must have a `run` method that runs the filter on a graph object (node or edge)

Any alias referenced (such as `mike` in the above example) must be matched in the alias map created using a previous `Match` builder.

### Return

`Return` selects what is to be returned as results for each alias that references a result set of matching graph objects.

Return expressions can select the alias itself (each full object) a given property for each object, the count of objects or aggregations of props, such as the sum or average of given (numerical) properties.

Each return expression can be assigned an alias or will determine a default alias if possible.

### Result

`Result` expressions can be used to partition the result set into a window (`limit` and `skip` rows of data) or to combine result sets (`union`)

```js
const q = query(gun);
q.match.node({ alias: "mike" });
q.return.obj("mike").prop("age").as("years old");
return q.result.limit({ count: 5 }).skip({ count: 2 });
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

The Cypher Query Builder is composed via a `builderMap` passed into the root `QueryBuilder` instance.

The `builderMap` must adhere to the following interfaces. By default a `defaultBuilderMap` function is called to create and setup the built-in builder map using the Builder classes that come with this library out of the box.

```ts
export interface ReturnBuilderMap {
  aggregation: ReturnBuilderFn;
  count: ReturnBuilderFn;
  prop: ReturnBuilderFn;
}

export interface ResultBuilderMap {
  root: ResultBuilderFn;
  skip: ResultBuilderFn;
  limit: ResultBuilderFn;
  union: ResultBuilderFn;
}

export type WhereRootBuilderFn = (
  q: IQueryBuilder,
  config: any
) => IWhereBuilder;

export interface WhereBuilderMap {
  root: WhereRootBuilderFn;
  or: WhereBuilderFn;
  and: WhereBuilderFn;
  not: WhereBuilderFn;
}

export interface IBuilderMap {
  create: {
    root: CreateRootFactoryFn;
  };
  delete: {
    root: DeleteRootFactoryFn;
  };
  match: {
    root: MatchBuilderRootFactoryFn;
  };
  where: WhereBuilderMap;
  return: ReturnBuilderMap;
  result: ResultBuilderMap;
}
```

The `Strategy` instance used by the builder must be configured with a `strategyMap` instance that implement `IStrategyMap` and which contains a map of the factory methods to create each type of strategy for the chainable builder DSL methods.

This makes the strategy completely configurable and composable, so that you can override, customize and extend with a strategy to fit your particular needs.

By default it calls `defaultStrategyMap` to generate a default strategy based on the default filter and result expressions provided.

```ts
export const defaultStrategyMap = (): IStrategyMap => {
  return {
    // ...
  };
};
```

Each builder method looks up a "strategy" from the `strategyMap` and adds a query expression (such as a filter) using that strategy. Here is an example for the `AndExprBuilder` (builder of an `And` query expression). The builder class initially creates an instance of `strategyMap.filter.exprMap.boolean.and`. Each time `matches(config)` is called on the builder, the config is parsed/evaluated using `createFilterFrom(config)` and a filter is created from that `config` and added to the and expression using `this.expr.addFilter(expr);`

```ts
export class AndExprBuilder extends BaseExprBuilder {
  expr: IAndFilterExpr;

  constructor(w: IWhereBuilder, config: any = {}) {
    super(w);
    // Note: the create and add could both be encapsulated under the addExpression method
    // createExpression uses strategyMap
    const expr = this.strategy.createExpression("and", config);
    // based on the expr figures out which controller and clause to add it to
    this.strategy.addExpression(expr);
    this.expr = expr;
  }

  matches(config: any) {
    const expr = this.createFilterFrom(config);
    this.expr.addFilter(expr);
    return this;
  }
}
```

All the expressions should be gathered in an `IExpressionsTree`. Each root node is an `IAliasFilterExpr` for a given type of expressions. The `IAliasFilterExpr` is a composite, which may contain a tree of composite expressions.

```ts
export interface IQueryController {
  match?: IMatchController;
  where?: IWhereController;
  return?: IReturnController;

  run(): IQueryResult | undefined;
}
```

The `IMatchController`

```ts
export interface IMatchController {
  clauses: IMatchClauses;
}
```

The `IWhereController` is a composite of where conditions that MUST be true (in `must`) and OPTIONAL conditions (in `optional`)

The `IWhereController` must control the execution of both these clauses and sets of filter expressions.

```ts
export interface IWhereController {
  clauses: IWhereClauses;
}

export class WhereController implements IWhereController {
  clauses: IWhereClauses = new WhereClauses();
}
```

The `ICypherStrategy` must contain all the clauses with expressions built up from the builder. The clauses (and expressions) are maintained and controlled in a instance of `IQueryController`.

```ts
export interface ICypherStrategy {
  queryController: IQueryController;
  setGraphApi(graphApi: IGraphApi): ICypherStrategy;
  configure(config: any): ICypherStrategy;
  run(objs: GraphObjDef[]): IQueryResult;
}
```

The executer can then pass in the `apis` such as `api: IGraphApi` for accessing the graph as a whole and `graphObjApi: IGraphObjApi;` for operating on individual graph objects.

```ts
export interface ICypherStrategyExecuter {
  strategy: ICypherStrategy;
  configure(config: any);
  run(): IResult;
}

export class CypherStrategyExecuter {
  strategy: ICypherStrategy;

  constructor(strategy: ICypherStrategy) {
    this.strategy = strategy;
  }

  configure(config: any) {
    this.strategy.configure(config);
    return this;
  }

  run() {
    // configure stategy if needed
    // traverse graph to retrieve objects to feed to strategy.run
    // run filters in strategy on graph using api
    return this.strategy.run(objs);
  }
}
```

Using an executer:

```ts
// strategy created by query builder
const executer = createStrategyExecuter(strategy);
const queryResult = executer.configure(config).run();
```

The executer can decide how to feed the graph objects to the strategy, either as a list, as a stream, or whatever. All the strategy should deal with is receiving one or more (graph) objects to filter on and return results for.

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

#### Composite filters

The `Filter` class contains a `run` method of the following form

```ts
  run() {
    this.result = this.filterAll(this.objs);
    return this;
  }
```

Any class implementing `IFilterExpr` must contain a `run` and `runAll` methods.

The method `run` passes a single graph `object` through the filter and returns the object if the filter passes and returns `undefined` if not

The method `runAll` passes a list of graph objects through and returns a list of the objects that passed the filter.

```ts
interface IFilterExpr {
  run(obj: any): GraphObjDef | undefined;
  runAll(objs: GraphObjDef[]): GraphObjDef[];
}
```

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

`not` on `false` (no matching nodes) means the inverse set, ie. all nodes in the root. If the not filter had returned one or more nodes, the inverse set would be the root nodes minus the nodes matched by the not filter.

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

#### Query example

Let's assume we have a graph with the following nodes and edges and relationships.

Persons

```ts
const michael = {
  type: "node",
  labels: ["person"],
  props: { name: "michael", age: 36, sex: "male" },
};

const anna = {
  type: "node",
  labels: ["person"],
  props: { name: "anna", age: 27, sex: "female" },
};

const thomas = {
  type: "node",
  labels: ["person"],
  props: { name: "thomas", age: 17, sex: "male" },
};

export { michael, anna };
```

Cars

```ts
const mazda = {
  type: "node",
  labels: ["car"],
  props: { brand: "mazda" },
};

const audi = {
  type: "node",
  labels: ["car"],
  props: { brand: "audi" },
};

export { mazda, audi };
```

Ownerships

```ts
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
```

We can then make a query as follows where we match any `person` node as `p`, any `car` node as `c`.

```ts
const q = query(gun);
const $match = q.match;
$match.obj("p").matches({ label: "person" });
$match.obj("c").matches({ label: "car" });
```

This would create the following alis matching map:

```ts
{
  'p': [michael, anna, thomas],
  'c': [mazda, audi],
}
```

We can then use where queries to further filter from these aliased filter results.

```ts
const $where = q.where;
$where.obj("p").props({ age: { gte: 18 }, sex: "male" });
$where.obj("c").props({ since: { gte: 2015 } });
```

This would result in the following:

```ts
{
  'p': [michael, anna],
  'c': [audi],
}
```

We can then use `return` to select what to return

```ts
const $return = q.return;
$return.alias("p").count({ distinct: true }).as("number of legal owners");
$return.alias("c").prop("brand").as("car brand");
```

This would give us the final table

```ts
{
  headers: ['number of legal owners', 'car brand'],
  data: [
    [1, 'mazda'],
    [1, 'audi']
  ]
}
```

Finally we can select a window of the result set (`skip` and `limit`) or combine it with another result set (`union`)

```ts
const $result = q.result;
$result.limit({ count: 5 });
```

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
