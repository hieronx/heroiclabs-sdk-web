import {ApiRequest} from './request';

export class StorageGetRequest extends ApiRequest {
  constructor(session, key) {
    super('GET', '/v0/gamer/storage/' + key, session);
    this._responseCallback = function (xhr) {
      var body = JSON.parse(xhr.responseText);
      if (body.content_type === 'application/json') {
        body.value = JSON.parse(body.value);
      }
      return body;
    };
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
