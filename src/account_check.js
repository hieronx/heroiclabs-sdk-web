import {AccountsRequest} from './request';

class CheckRequest extends AccountsRequest {
  constructor(accessToken, provider) {
    var body = {'access_token': accessToken};
    var url = '/v0/gamer/check/' + provider;
    super('POST', url, null, body);
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class CheckTangoRequest extends CheckRequest {
  constructor(accessToken) {
    super(accessToken, 'tango');
  }
}

export class CheckFacebookRequest extends CheckRequest {
  constructor(accessToken) {
    super(accessToken, 'facebook');
  }
}

export class CheckGoogleRequest extends CheckRequest {
  constructor(accessToken) {
    super(accessToken, 'google');
  }
}

export class CheckAnonymousRequest extends AccountsRequest {
  constructor(id) {
    var body = {'id': id};
    var url = '/v0/gamer/check/anonymous';
    super('POST', url, null, body);
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class CheckEmailRequest extends AccountsRequest {
  constructor(email) {
    var body = {'email': email};
    var url = '/v0/gamer/check/email';
    super('POST', url, null, body);
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}
