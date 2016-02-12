import {ApiRequest} from './request';

export class MatchListRequest extends ApiRequest {
  constructor(session) {
    super('GET', '/v0/gamer/match', session);
  }
}

export class MatchesSinceRequest extends ApiRequest {
  constructor(session, timestamp) {
    var queryParam = {'since': timestamp};
    super('GET', '/v0/gamer/matches/', session, null, queryParam);
  }
}

export class MatchGetRequest extends ApiRequest {
  constructor(session, matchId) {
    super('GET', '/v0/gamer/match/' + matchId, session);
  }
}

export class MatchTurnGetRequest extends ApiRequest {
  constructor(session, matchId, sinceTurnNumber) {
    super('GET', '/v0/gamer/match/' + matchId + '/turn/' + sinceTurnNumber, session);
  }
}

export class MatchTurnSubmitRequest extends ApiRequest {
  constructor(session, matchId, lastSeenTurnNumber, nextGamerId, turnData) {
    var body = {
      'last_turn': lastSeenTurnNumber,
      'next_gamer_id': nextGamerId,
      'data': turnData
    };
    super('POST', '/v0/gamer/match/' + matchId + '/turn', session, body);
  }
}

export class MatchTurnEndRequest extends ApiRequest {
  constructor(session, matchId) {
    var body = {'action': 'end'};
    super('POST', '/v0/gamer/match/' + matchId, session, body);
  }
}

export class MatchTurnLeaveRequest extends ApiRequest {
  constructor(session, matchId) {
    var body = {'action': 'end'};
    super('POST', '/v0/gamer/match/' + matchId, session, body);
  }
}

export class MatchCreateRequest extends ApiRequest {
  constructor(session, gamerIds) {
    var body = {'gamers': gamerIds, 'filters': []};
    super('PUT', '/v0/gamer/match', session, body);
  }

  addGamer(gamer) {
    this._body.gamers.push(gamer);
    return this;
  }

  addFilter(filter) {
    this._body.filters.push(filter);
    return this;
  }
}

export class MatchMakeRequest extends ApiRequest {
  constructor(session, players) {
    var body = {'players': players, 'filters': []};
    super('POST', '/v0/gamer/match', session, body);
  }

  addFilter(filter) {
    this._body.filters.push(filter);
    return this;
  }
}
