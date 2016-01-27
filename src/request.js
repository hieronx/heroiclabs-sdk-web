export class Request {
  constructor(method, url, session, queryParams, body) {
    this.type = 'api';
    this.method = method;
    this.url = url;
    this.session = session;
    this.queryParams = queryParams;
    this.body = body;
  }
}
