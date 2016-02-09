import {ApiRequest} from './request';

export class ServerRequestRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/server');
  }
}
