import {AccountsRequest} from './request';
import {Session} from './session';

class LoginRequest extends AccountsRequest {
  constructor(accessToken, provider) {
    var body = {'access_token': accessToken};
    var url = '/v0/gamer/login/' + provider;
    super('POST', url, null, body);
    super.responseCallback = function (xhr) {
      var session = new Session(xhr.responseBody.token);
      session.freeze();
      return session;
    };
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class LoginTangoRequest extends LoginRequest {
  constructor(accessToken) {
    super(accessToken, 'tango');
  }
}

export class LoginFacebookRequest extends LoginRequest {
  constructor(accessToken) {
    super(accessToken, 'facebook');
  }
}

export class LoginGoogleRequest extends LoginRequest {
  constructor(accessToken) {
    super(accessToken, 'google');
  }
}

export class LoginAnonymousRequest extends AccountsRequest {
  constructor(id) {
    var body = {'id': id};
    var url = '/v0/gamer/login/anonymous';
    super('POST', url, null, body);
    super.responseCallback = function (xhr) {
      return new Session(xhr.responseBody.token);
    };
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class LoginEmailRequest extends AccountsRequest {
  constructor(email, password) {
    var body = {'email': email, 'password': password};
    var url = '/v0/gamer/login/email';
    super('POST', url, null, body);
    super.responseCallback = function (xhr) {
      return new Session(xhr.responseBody.token);
    };
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class CreateEmailRequest extends AccountsRequest {
  constructor(email, password, confirmPassword) {
    var body = {'email': email, 'password': password, 'confirm_password': confirmPassword};
    var url = '/v0/gamer/account/email/create';
    super('POST', url, null, body);
    super.responseCallback = function (xhr) {
      return new Session(xhr.responseBody.token);
    };
  }

  name(name) {
    super.body.name = name;
    return this;
  }

  nickname(nickname) {
    super.body.nickname = nickname;
    return this;
  }

  session(session) {
    if (!session.hasOwnProperty('token')) { throw new Error('Invalid Session Object'); }
    super.session = session;
    return this;
  }
}

export class EmailPasswordResetRequest extends AccountsRequest {
  constructor(email) {
    var body = {'email': email};
    var url = '/v0/gamer/account/email/reset/send';
    super('POST', url, null, body);
  }
}
