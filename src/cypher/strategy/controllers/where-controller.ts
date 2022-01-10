export interface IWhereFilterBucket {
  must: [];
  optional: [];
}

export interface IWhereController {
  expressions: IWhereFilterBucket;
}

export class WhereController implements IWhereController {
  expressions: IWhereFilterBucket = {
    must: [],
    optional: [],
  };
}
