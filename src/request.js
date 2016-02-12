class Request {
  constructor(type, method, url, session, body, queryParams) {
    this._type = type;
    this._method = method;
    this._url = url;
    this._session = session;
    this._body = body;
    this._queryParams = queryParams;

    this._responseCallback = null; // response callback function;
  }
}

export class ApiRequest extends Request {
  constructor(method, url, session, body, queryParams) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    super('api', method, url, session, body, queryParams);
  }
}

export class AccountsRequest extends Request {
  constructor(method, url, session, body, queryParams) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    super('accounts', method, url, session, body, queryParams);
  }
}
