import { ErrorHandler } from "./error-handler";

export class Handler {
  eh: ErrorHandler;

  // TODO: use IoC injection
  constructor() {
    this.eh = new ErrorHandler();
  }

  error(...msg: any[]) {
    return this.eh.error(...msg);
  }
}
