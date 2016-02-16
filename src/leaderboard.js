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
 * List all available leaderboards.
 */
export class LeaderboardListRequest extends ApiRequest {

  /**
   * @return {LeaderboardListRequest} An instance of this object.
   */
  constructor() {
    super('GET', '/v0/game/leaderboard');
  }
}

/**
 * Get a leaderboard, along with some subset of its entries.
 */
export class LeaderboardGetRequest extends ApiRequest {

  /**
   * @param  {String} leaderboardId The leaderboard ID to get data for.
   * @return {LeaderboardGetRequest} An instance of this object.
   */
  constructor(leaderboardId) {
    super('GET', '/v0/game/leaderboard/' + leaderboardId, null, null, {});
  }

  /**
   * Set an offset to shift the 'page' of returned entries start point. Optional.
   * Default 0 (first page). Must be greater than or equal to 0
   * @param  {Integer} offset The offset value to use, default 0, must be greater than or equal to 0.
   * @return {LeaderboardGetRequest} Current instance of this object, can be used to chain function calls.
   */
  offset(offset) {
    this._queryParams.offset = offset;
    return this;
  }

  /**
   * Set a 'page' size limit for returned entries. Optional.
   * Default 50. Must be between 10 and 50, inclusive.
   * @param  {Integer} limit The limit size to use, default 50, must be between 10 and 50, inclusive.
   * @return {LeaderboardGetRequest} Current instance of this object, can be used to chain function calls.
   */
  limit(limit) {
    this._queryParams.limit = limit;
    return this;
  }

  /**
   * Indicate that the entries contained in the leaderboard response should include their attached
   * scoretags, if any are present.
   * @return {LeaderboardGetRequest} Current instance of this object, can be used to chain function calls.
   */
  withScoretags() {
    this._queryParams['with_scoretags'] = true;
    return this;
  }
}

/**
 * Get a leaderboard, along with some subset of its entries, and the rank information for the current account.
 */
export class LeaderboardAndRankGetRequest extends LeaderboardGetRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} leaderboardId The leaderboard ID to get data for.
   * @return {LeaderboardAndRankGetRequest} An instance of this object.
   */
  constructor(session, leaderboardId) {
    super(leaderboardId);
    this._url = '/v0/gamer/leaderboard/' + leaderboardId;
    this._session = session;
  }

  /**
   * Indicate that the entries 'page' contained in the leaderboard response should be 'scrolled' to
   * contain the current account. Equivalent to autoOffset(true)
   * @return {LeaderboardAndRankGetRequest} Current instance of this object, can be used to chain function calls.
   */
  autoOffset() {
    this._queryParams['auto_offset'] = true;
    return this;
  }
}

/**
 * Submit a new score to a leaderboard.
 */
export class LeaderboardUpdateRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} leaderboardId The leaderboard ID to update.
   * @param  {Integer} score The new score to submit.
   * @return {LeaderboardUpdateRequest} An instance of this object.
   */
  constructor(session, leaderboardId, score) {
    var body = {'score': score};
    super('POST', '/v0/gamer/leaderboard/' + leaderboardId, session, body);
  }

  /**
   * Set a scoretags object that will be serialized and stored alongside the leaderboard entry.
   * @param  {Object} scoretags The scoretags to store.
   * @return {LeaderboardUpdateRequest} Current instance of this object, can be used to chain function calls.
   */
  scoretags(scoretags) {
    this._body.scoretags = scoretags;
    return this;
  }
}
