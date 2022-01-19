import { IQueryBuilder } from "..";
import { ClauseBuilder } from "../clause-builder";

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

export class DeleteBuilder extends ClauseBuilder {
  nodes(...labels: string[]) {}
  relations(...labels: string[]) {}
}
