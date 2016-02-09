import {ApiRequest} from './request';

export class StorageGetRequest extends ApiRequest {
  constructor(session, key) {
    super('GET', '/v0/gamer/storage/' + key, session);
  }
}

export class StoragePutRequest extends ApiRequest {
  constructor(session, key, data) {
    super('PUT', '/v0/gamer/storage/' + key, session, data);
  }
}

export class StorageDeleteRequest extends ApiRequest {
  constructor(session, key) {
    super('DELETE', '/v0/gamer/storage/' + key, session);
  }
}
