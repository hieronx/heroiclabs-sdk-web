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
 * List all matches the current gamer is part of.
 */
export class MatchListRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @return {MatchListRequest} An instance of this object.
   */
  constructor(session) {
    super('GET', '/v0/gamer/match', session);
  }
}

/**
 * Get a list of all matches with turn data newer than a given UTC timestamp.
 * Only retrieve matches with turns newer than this UTC timestamp in milliseconds.
 * Includes match metadata and the turns newer than the given time.
 */
export class MatchesSinceRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {Integer} timestamp The UTC timestamp in milliseconds to use as a lower time threshold.
   * @return {MatchesSinceRequest} An instance of this object.
   */
  constructor(session, timestamp) {
    var queryParam = {'since': timestamp};
    super('GET', '/v0/gamer/matches/', session, null, queryParam);
  }
}

/**
 * Get metadata about a specific match.
 */
export class MatchGetRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} matchId The match ID to retrieve.
   * @return {MatchGetRequest} An instance of this object.
   */
  constructor(session, matchId) {
    super('GET', '/v0/gamer/match/' + matchId, session);
  }
}

/**
 * Get some or all of the turns for a given match.
 */
export class MatchTurnGetRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} matchId The match ID to retrieve.
   * @param  {Integer} sinceTurnNumber Retrieve all turns newer than this turn number.
   * @return {MatchTurnGetRequest} An instance of this object.
   */
  constructor(session, matchId, sinceTurnNumber) {
    super('GET', '/v0/gamer/match/' + matchId + '/turn/' + sinceTurnNumber, session);
  }
}

/**
 * Submit a new turn to the specified match.
 */
export class MatchTurnSubmitRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} matchId The match ID to submit.
   * @param  {Integer} lastSeenTurnNumber The last turn number seen by this client for the match.
   * @param  {String} nextGamerId The gamer ID of the gamer who must submit a turn next.
   * @param  {Object} turnData The turn data itself.
   * @return {MatchTurnSubmitRequest} An instance of this object.
   */
  constructor(session, matchId, lastSeenTurnNumber, nextGamerId, turnData) {
    var body = {
      'last_turn': lastSeenTurnNumber,
      'next_gamer_id': nextGamerId,
      'data': turnData
    };
    super('POST', '/v0/gamer/match/' + matchId + '/turn', session, body);
  }
}

/**
 * End a match.
 */
export class MatchTurnEndRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} matchId The match ID to end.
   * @return {MatchTurnEndRequest} An instance of this object.
   */
  constructor(session, matchId) {
    var body = {'action': 'end'};
    super('POST', '/v0/gamer/match/' + matchId, session, body);
  }
}

/**
 * Leave a match.
 */
export class MatchTurnLeaveRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String} matchId The match ID to leave.
   * @return {MatchTurnLeaveRequest} An instance of this object.
   */
  constructor(session, matchId) {
    var body = {'action': 'end'};
    super('POST', '/v0/gamer/match/' + matchId, session, body);
  }
}

/**
 * Explicitly create a new match, skipping the matchmaking service.
 */
export class MatchCreateRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {String[]} gamerIds The array of gamer IDs to add to the match, NOT including the current gamer ID.
   * @return {MatchCreateRequest} An instance of this object.
   */
  constructor(session, gamerIds) {
    var body = {'gamers': gamerIds, 'filters': []};
    super('PUT', '/v0/gamer/match', session, body);
  }

  /**
   * Add a new gamer ID as a participant for the match being created.
   * @param  {String} gamer Gamer ID to add to the match.
   * @return {MatchCreateRequest} Current instance of this object, can be used to chain function calls.
   */
  addGamer(gamer) {
    this._body.gamers.push(gamer);
    return this;
  }

  /**
   * Add filter to use to narrow down the pool of potential opponents.
   * @param  {String} filter Filter string to add to the list of filters.
   * @return {MatchCreateRequest} Current instance of this object, can be used to chain function calls.
   */
  addFilter(filter) {
    this._body.filters.push(filter);
    return this;
  }
}

/**
 * Request a new match through the matchmaking service.
 */
export class MatchMakeRequest extends ApiRequest {

  /**
   * @param  {Session} session Session identifying the account making this request.
   * @param  {Integer} players Total number of players required in the match.
   * @return {MatchMakeRequest} An instance of this object.
   */
  constructor(session, players) {
    var body = {'players': players, 'filters': []};
    super('POST', '/v0/gamer/match', session, body);
  }

  /**
   * Add filter to use to narrow down the pool of potential opponents.
   * @param  {String} filter Filter string to add to the list of filters.
   * @return {MatchCreateRequest} Current instance of this object, can be used to chain function calls.
   */
  addFilter(filter) {
    this._body.filters.push(filter);
    return this;
  }
}
