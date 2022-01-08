import { IQueryBuilder } from "../..";
import {
  IReturnNumberClause,
  ReturnNumberClause,
} from "./return-number-clause";

export const createCountBuilder = (q: IQueryBuilder, config: any) =>
  new CountBuilder(q).config(config);

export interface ICountBuilder extends IReturnNumberClause {}

export class CountBuilder extends ReturnNumberClause {
  $distinct = false;

  distinct() {
    this.$distinct = true;
    return this;
  }
}
