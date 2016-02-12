import {ApiRequest} from './request';

export class SharedStorageGetRequest extends ApiRequest {
  constructor(session, key) {
    super('GET', '/v0/gamer/shared/' + key, session);
  }
}

export class SharedStoragePutRequest extends ApiRequest {
  constructor(session, key, data) {
    super('PUT', '/v0/gamer/shared/' + key + '/public', session, data);
  }
}

export class SharedStoragePatchRequest extends ApiRequest {
  constructor(session, key, data) {
    super('PATCH', '/v0/gamer/shared/' + key + '/public', session, data);
  }
}

export class SharedStorageDeleteRequest extends ApiRequest {
  constructor(session, key) {
    super('DELETE', '/v0/gamer/shared/' + key + '/public', session);
  }
}

export class SharedStorageSearchRequest extends ApiRequest {
  constructor(session, query) {
    var queryParams = {'query': query};
    super('GET', '/v0/gamer/shared/', session, null, queryParams);
  }

  filterKey(key) {
    this._queryParams['filter_key'] = key;
    return this;
  }

  sort(key) {
    this._queryParams.sort = key;
    return this;
  }

  offset(offset) {
    this._queryParams.offset = offset;
    return this;
  }

  limit(limit) {
    this._queryParams.limit = limit;
    return this;
  }
}