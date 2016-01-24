import {Request} from './request';

export class PingRequest extends Request {
  constructor(builder) {
    super();
    this._builder = builder;
  }

  builder() {
    return new PingRequestBuilder();
  }
}

class PingRequestBuilder {
  session(session) {
    this._session = session;
  }

  build() {
    return new PingRequest(this);
  }
}
