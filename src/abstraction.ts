/* Triple Traversal Object
 * This stores options and is meant to become the transport object between
 * functions that execute during Traversal
 */

interface ITriple {
  subject: any;
  predicate: any;
  object: any;
  result?: any[];
}

export class TripTrav {
  subject: any;
  predicate: any;
  object: any;
  result: any[];

  constructor(triple: ITriple) {
    this.subject = triple.subject;
    this.predicate = triple.predicate;
    this.object = triple.object;
    this.result = [];
  }
}

/* Select an object to match from a node */

export class SelectTrav {
  obj: any;
  result: any[];

  constructor(obj: any) {
    this.obj = obj;
    this.result = [];
  }
}

/* Local Graph Functions
 * To build a graph for queries
 * To build a graph to perform graph operations on
 */

export class LocalGraph {
  map = new Map();

  constructor() {}

  add(item: any) {
    const uuid = uuidv4();
    this.map.set(uuid, item);
    return uuid;
  }

  find(uuid: string) {
    return this.map.get(uuid);
  }
  update(uuid: string, item: any) {
    this.map.set(uuid, item);
  }
}

export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
