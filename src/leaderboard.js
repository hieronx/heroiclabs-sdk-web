import {ApiRequest} from './request';

export class LeaderboardListRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/game/leaderboard');
  }
}

export class LeaderboardGetRequest extends ApiRequest {
  constructor(leaderboardId) {
    super('GET', '/v0/game/leaderboard/' + leaderboardId, null, null, {});
  }

  offset(offset) {
    this._queryParams.offset = offset;
    return this;
  }

  limit(limit) {
    this._queryParams.limit = limit;
    return this;
  }

  withScoretags() {
    this._queryParams['with_scoretags'] = true;
    return this;
  }
}

export class LeaderboardAndRankGetRequest extends LeaderboardGetRequest {
  constructor(session, leaderboardId) {
    super(leaderboardId);
    this._url = '/v0/gamer/leaderboard/' + leaderboardId;
    this._session = session;
  }

  autoOffset() {
    this._queryParams['auto_offset'] = true;
    return this;
  }
}

export class LeaderboardUpdateRequest extends ApiRequest {
  constructor(session, leaderboardId, score) {
    var body = {'score': score};
    super('POST', '/v0/gamer/leaderboard/' + leaderboardId, session, body);
  }

  scoretags(scoretags) {
    this._body.scoretags = scoretags;
    return this;
  }
}
