import csvtojson from "csvtojson";
import request from "request";
import { Clause } from "../clause";
import { Query } from "../..";
import { IQueryBuilder } from "../builder";

export class Csv extends Clause {
  csv: any;

  constructor(q: IQueryBuilder) {
    super(q);
    this.csv = csvtojson();
  }

  // see https://www.npmjs.com/package/csvtojson
  fromFile(url: string, rowAlias: string, headers = true) {
    try {
      this.csv.fromFile(url).then((json: any) => {
        json.forEach((row: any) => {
          console.log(row);
        });
        this.onComplete();
      });
    } catch (e) {
      this.onError(e);
    }
  }

  fetch(url: string) {
    return request.get(url);
  }

  fromStream(url: string, rowAlias: string, headers = true) {
    try {
      const stream = this.fetch(url);
      const csv = this.csv.fromStream(stream).subscribe(
        (json: any) => {
          return new Promise((resolve, reject) => {
            // long operation for each json e.g. transform / write into database.
            console.log(json);
          });
        },
        this.onError,
        this.onComplete
      );
    } catch (e) {
      this.onError(e);
    }
  }

  onError(err: any) {}

  onComplete() {}
}
