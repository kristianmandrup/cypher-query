import { ClauseType } from "../enum";

export interface IQueryClause {
  get type(): ClauseType;
}

export class QueryClause implements IQueryClause {
  error(msg: string) {
    throw new Error(msg);
  }

  get typeName(): string {
    return ClauseType[this.type];
  }

  get type() {
    this.error("Must be implemented by subclass");
    return ClauseType.unknown;
  }
}
