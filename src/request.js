class Request {
  constructor(type, method, url, session, body, queryParams) {
    this.type = type;
    this.method = method;
    this.url = url;
    this.session = session;
    this.body = body;
    this.queryParams = queryParams;

    this.responseCallback = null; // response callback function;
  }
}

export class ApiRequest extends Request {
  constructor(method, url, session, body, queryParams) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super('api', method, url, session, body, queryParams);
  }
}

export class AccountsRequest extends Request {
  constructor(method, url, session, body, queryParams) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super('accounts', method, url, session, body, queryParams);
  }
}
