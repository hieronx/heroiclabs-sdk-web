import {ApiRequest} from './request';

export class GameGetRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/game');
  }
}
