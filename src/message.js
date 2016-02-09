import {ApiRequest} from './request';

export class MessageListRequest extends ApiRequest {
  constructor(session) {
    super('GET', '/v0/gamer/message', session, null, {});
  }

  since(timestamp) {
    super.queryParams.since = timestamp;
    return this;
  }

  withBody() {
    super.queryParams['with_body'] = true;
    return this;
  }
}

export class MessageReadRequest extends ApiRequest {
  constructor(session, messageId) {
    super('GET', '/v0/gamer/message/' + messageId, session, null, {});
  }

  withNoBody() {
    super.queryParams['with_body'] = false;
    return this;
  }
}

export class MessageDeleteRequest extends ApiRequest {
  constructor(session, messageId) {
    super('DELETE', '/v0/gamer/message/' + messageId, session);
  }
}
