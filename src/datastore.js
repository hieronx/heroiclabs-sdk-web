/*
 * Copyright 2016 Heroic Labs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {ApiRequest} from './request';

/**
 * Get the value stored in Shared Storage under a particular key.
 */
export class DatastoreGetRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} table The name of the table to read from.
   * @param  {String} key The key to get the corresponding value for.
   * @return {DatastoreGetRequest} An instance of this object.
   */
  constructor(session, table, key) {
    super('GET', '/v0/datastore/' + table + '/' + key, session);
    this._table = table;
    this._key = key;
  }

  /**
   * Sets the key owner.
   * @param  {Integer} owner The owner to retrieve the key for.
   * Must be a Gamer ID, or the value "me" representing the current user.
   * @return {DatastoreSearchRequest} Current instance of this object, can be used to chain function calls.
   */
  owner(owner) {
    this._url = '/v0/datastore/' + this._table + '/' + this._key + '/' + owner;
    return this;
  }
}

/**
 * Set the value of a specific key in the given Datastore table, where the key owner is the gamer making the request.
 * If the key does not exist, it will be created.
 */
export class DatastorePutRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} table The name of the table to write to.
   * @param  {String} key The name of the key to write to
   * @param  {Object} data Any existing data for the specified key will be completely replaced.
   * @return {DatastorePutRequest} An instance of this object.
   */
  constructor(session, table, key, data) {
    super('PUT', '/v0/datastore/' + table + '/' + key, session, {});
    this.body(data);
  }

  /**
   * Set the value of a specific key in the given Datastore table, where the key owner is the gamer making the request.
   * If the key does not exist, it will be created.
   * @param  {Object} data Data to store.
   * @return {DatastorePutRequest} Current instance of this object, can be used to chain function calls.
   */
  body(data) {
    this._body.data = data;
    return this;
  }

  /**
   * Permissions for this object. The permissions object may be omitted.
   * The write operation will then use default permissions set for the table for newly created keys,
   * or preserve existing permissions set on the key for updated keys.
   * @param  {number} read Read permission. Valid values are `0`, `1` and `2`.
   * @param  {number} write Write permission. Valid values are `0` and `1`.
   * @return {DatastorePutRequest} Current instance of this object, can be used to chain function calls.
   */
  permissions(read, write) {
    this._body.permissions = {
      'read': read,
      'write': write
    };
    return this;
  }
}

/**
 * Update the value of a specific key in the given Datastore table, where the key owner is the gamer making the request.
 * If the key does not exist, it will be created.
 * Any existing data for the specified key will be merged with the new data.
 * Fields specified in the new input will replace their old values, if any.
 * Fields present in the existing data but missing in the new input will remain unchanged.
 */
export class DatastoreUpdateRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} table The name of the table to write to.
   * @param  {String} key The name of the key to write to
   * @param  {Object} data Any existing data for the specified key will be completely replaced.
   * @return {DatastorePutRequest} An instance of this object.
   */
  constructor(session, table, key, data) {
    super('PATCH', '/v0/datastore/' + table + '/' + key, session, {});
    this.body(data);
  }

  /**
   * Set the value of a specific key in the given Datastore table, where the key owner is the gamer making the request.
   * If the key does not exist, it will be created.
   * @param  {Object} data Data to store.
   * @return {DatastoreUpdateRequest} Current instance of this object, can be used to chain function calls.
   */
  body(data) {
    this._body.data = data;
    return this;
  }

  /**
   * Permissions for this object. The permissions object may be omitted.
   * The write operation will then use default permissions set for the table for newly created keys,
   * or preserve existing permissions set on the key for updated keys.
   * @param  {number} read Read permission. Valid values are `0`, `1` and `2`.
   * @param  {number} write Write permission. Valid values are `0` and `1`.
   * @return {DatastoreUpdateRequest} Current instance of this object, can be used to chain function calls.
   */
  permissions(read, write) {
    this._body.permissions = {
      'read': read,
      'write': write
    };
    return this;
  }
}

/**
 * Delete a specific key from the given Datastore table,
 * where the owner of the key is the gamer account making the request.
 */
export class DatastoreDeleteRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} table The name of the table to delete from.
   * @param  {String} key The name of the key to write to
   * @return {DatastoreDeleteRequest} An instance of this object.
   */
  constructor(session, table, key) {
    super('DELETE', '/v0/datastore/' + table + '/' + key, session);
  }
}

/**
 * Perform a search query on the data in a given Datastore table, using Lucene-like query syntax.
 */
export class DatastoreSearchRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} table The name of the table to search from.
   * @param  {String} query The query string to execute.
   * @return {DatastoreSearchRequest} An instance of this object.
   */
  constructor(session, table, query) {
    var queryParams = {'query': query};
    super('GET', '/v0/datastore/' + table, session, null, queryParams);
  }

  /**
   * Restrict the query to run only over Shared Storage keys with the given name. Defaults to no filter,
   * the query will run over all Shared Storage records.
   * @param  {String} key The key filter to use.
   * @return {DatastoreSearchRequest} Current instance of this object, can be used to chain function calls.
   */
  filterKey(key) {
    this._queryParams['filter_key'] = key;
    return this;
  }

  /**
   * Define a sort order for the results. Defaults to no sort, natural ordering is used.
   * @param  {String} key The sort order definition to use.
   * @return {DatastoreSearchRequest} Current instance of this object, can be used to chain function calls.
   */
  sort(key) {
    this._queryParams.sort = key;
    return this;
  }

  /**
   * Offset query results by the given number of entries. Useful for paginating query results.
   * Default 0 (first page). Must be greater than or equal to 0.
   * @param  {Integer} offset The query result offset to use.
   * @return {DatastoreSearchRequest} Current instance of this object, can be used to chain function calls.
   */
  offset(offset) {
    this._queryParams.offset = offset;
    return this;
  }

  /**
   * Limit the number of results returned in a single response. Must be between 0 and 100, inclusive. Default 10.
   * Using a limit of 0 will return no results, but can be useful for aggregation or similar scenarios
   * where the result count is useful by itself.
   * @param  {Integer} limit The maximum number of results to return in a response.
   * @return {DatastoreSearchRequest} Current instance of this object, can be used to chain function calls.
   */
  limit(limit) {
    this._queryParams.limit = limit;
    return this;
  }
}
