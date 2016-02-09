import {ApiRequest} from './request';

export class AchievementListRequest extends ApiRequest {
  constructor() {
    super('GET', '/v0/game/achievement');
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    super.url = '/v0/gamer/achievement';
    return this;
  }
}

export class AchievementUpdateRequest extends ApiRequest {
  constructor(session, count) {
    var body = {'count': count};
    super('POST', '/v0/gamer/achievement', session, body);
  }
}
