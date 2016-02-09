import {AccountsRequest} from './request';

export class GamerGetRequest extends AccountsRequest {
  constructor(session) {
    super('GET', '/v0/gamer', session);
  }
}

export class GamerUpdateRequest extends AccountsRequest {
  constructor(session, nickname) {
    var body = {'nickname': nickname};
    super('POST', '/v0/gamer', session, body);
  }
}
