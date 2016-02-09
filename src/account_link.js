import {AccountsRequest} from './request';

class LinkRequest extends AccountsRequest {
  constructor(session, accessToken, provider) {
    var body = {'access_token': accessToken};
    var url = '/v0/gamer/link/' + provider;
    super('POST', url, session, body);
  }
}

export class LinkTangoRequest extends LinkRequest {
  constructor(session, accessToken) {
    super(session, accessToken, 'tango');
  }
}

export class LinkFacebookRequest extends LinkRequest {
  constructor(session, accessToken) {
    super(session, accessToken, 'facebook');
  }
}

export class LinkGoogleRequest extends LinkRequest {
  constructor(session, accessToken) {
    super(session, accessToken, 'google');
  }
}

export class LinkAnonymousRequest extends AccountsRequest {
  constructor(session, id) {
    var body = {'id': id};
    var url = '/v0/gamer/link/anonymous';
    super('POST', url, session, body);
  }
}

export class LinkEmailRequest extends AccountsRequest {
  constructor(session, email) {
    var body = {'email': email};
    var url = '/v0/gamer/link/email';
    super('POST', url, session, body);
  }
}
