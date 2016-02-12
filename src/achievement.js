import {ApiRequest} from './request';

export class AchievementListRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/game/achievement');
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
    this._url = '/v0/gamer/achievement';
    return this;
  }
}

export class AchievementUpdateRequest extends ApiRequest {
  constructor(session, achievementId, count) {
    var body = {'count': count};
    super('POST', '/v0/gamer/achievement/' + achievementId, session, body);
  }
}
