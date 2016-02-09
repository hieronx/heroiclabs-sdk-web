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
    super.queryParams.offset = offset;
    return this;
  }

  limit(limit) {
    super.queryParams.limit = limit;
    return this;
  }

  withScoretags() {
    super.queryParams['with_scoretags'] = true;
    return this;
  }
}

export class LeaderboardAndRankGetRequest extends LeaderboardGetRequest {
  constructor(session, leaderboardId) {
    super(leaderboardId);
    super.url = '/v0/gamer/leaderboard/' + leaderboardId;
    super.session = session;
  }

  autoOffset() {
    super.queryParams.offset = -1;
    return this;
  }
}

export class LeaderboardUpdateRequest extends ApiRequest {
  constructor(session, leaderboardId, score) {
    var body = {'score': score};
    super('POST', '/v0/gamer/leaderboard' + leaderboardId, session, body);
  }

  scoretags(scoretags) {
    super.body.scoretags = scoretags;
    return this;
  }
}
