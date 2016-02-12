import {ApiRequest} from './request';

export class ServerRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/server');
  }
}
