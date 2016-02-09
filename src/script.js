import {ApiRequest} from './request';

export class ExecuteScriptRequest extends ApiRequest {
  constructor(scriptId) {
    var url = '/v0/game/script/' + scriptId;
    super('POST', url);
  }

  session(session) {
    super.session = session;
    return this;
  }

  data(data) {
    super.body = data;
    return this;
  }
}
