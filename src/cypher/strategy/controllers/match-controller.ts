import { IMatchFilter } from "..";

export interface IMatchController {
  expressions: IMatchFilter[];
}

export class MatchController implements IMatchController {
  expressions: IMatchFilter[] = [];
}
