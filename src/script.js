import {ApiRequest} from './request';

export class ExecuteScriptRequest extends ApiRequest {
  constructor(scriptId) {
    var url = '/v0/game/script/' + scriptId;
    super('POST', url);
  }

  session(session) {
    this._session = session;
    return this;
  }

  data(data) {
    this._body = data;
    return this;
  }
}
