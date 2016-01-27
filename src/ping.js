import {Request} from './request';

export class PingRequest extends Request {
  constructor() {
    super('GET', '/v0/');
  }

  session(session) {
    super.session = session;
    return this;
  }
}
