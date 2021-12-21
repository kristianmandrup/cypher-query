import { IGunChainReference } from "gun/types/chain";

export interface AliasMap {
  [alias: string]: NodeDef;
}

export interface Props {
  [key: string]: any;
}

export type RelSetArgs = {
  direction?: "from" | "to";
};

export type NodeDef = {
  alias?: string;
  labels?: string[];
  label?: string;
  props?: Props;
};

export interface RelationDef extends NodeDef {}

type ArrayOf<T> = T extends Array<infer U> ? U : never;
type ArrayAsRecord<DataType> = ArrayOf<DataType> extends never
  ? DataType
  : Record<string, any>;

export interface IPromisedChain extends IGunChainReference {
  promise<
    TResult1 = {
      data: any;
      put: ArrayAsRecord<any>;
      key: any;
      gun: IGunChainReference<any, any>;
    }
  >(
    onfulfilled?: (value: TResult1) => TResult1 | PromiseLike<TResult1>
  ): Promise<TResult1>;
}
