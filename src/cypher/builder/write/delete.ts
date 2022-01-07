import { IQueryBuilder } from "..";
import { Clause } from "../clause";

export interface IDeleteBuilder {
  nodes(...labels: string[]): any;
  relations(...labels: string[]): any;
}

export const createDeleteBuilder = (
  q: IQueryBuilder,
  config: any
): IDeleteBuilder => {
  return new DeleteBuilder(q).config(config);
};

export class DeleteBuilder extends Clause {
  nodes(...labels: string[]) {}
  relations(...labels: string[]) {}
}
