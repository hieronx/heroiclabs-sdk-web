export {PingRequest} from './pingrequest';

export class Client {
  constructor(builder) {
    this._builder = builder;
  }

  builder(apikey) {
    return new ClientBuilder(apikey);
  }

  execute(request) {
    return new Promise((resolve, reject) => resolve(true)); // FIXME
  }
}

class ClientBuilder {
  constructor(apikey) {
    this._apikey = apikey;
  }

  build() {
    return new Client(this);
  }
}
