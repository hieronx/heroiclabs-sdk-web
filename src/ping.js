import {ApiRequest} from './request';

export class PingRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/');
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
    return this;
  }
}
