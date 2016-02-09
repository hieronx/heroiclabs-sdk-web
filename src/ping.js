import {ApiRequest} from './request';

export class PingRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/');
  }

  session(session) {
    super.session = session;
    return this;
  }
}
