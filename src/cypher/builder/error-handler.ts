export class ErrorHandler {
  error(...msg: any[]) {
    console.log(...msg);
    throw new Error(msg[0]);
  }
}
