import { IGunChainReference } from "gun/types/chain";

export interface AliasMap {
  [alias: string]: ObjSetArgs;
}

export interface Props {
  [key: string]: any;
}

export type ObjSetArgs = {
  labels?: string[];
  label?: string;
  props?: Props;
};

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
