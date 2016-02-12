import {AccountsRequest} from './request';
import {Session} from './session';

class LoginRequest extends AccountsRequest {
  constructor(accessToken, provider) {
    var body = {'access_token': accessToken};
    var url = '/v0/gamer/login/' + provider;
    super('POST', url, null, body);
    this._responseCallback = function (xhr) {
      var body = JSON.parse(xhr.responseText);
      var session = new Session(body.token);
      Object.freeze(session);
      return session;
    };
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
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
    this._responseCallback = function (xhr) {
      var body = JSON.parse(xhr.responseText);
      var session = new Session(body.token);
      Object.freeze(session);
      return session;
    };
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
    return this;
  }
}

export class LoginEmailRequest extends AccountsRequest {
  constructor(email, password) {
    var body = {'email': email, 'password': password};
    var url = '/v0/gamer/login/email';
    super('POST', url, null, body);
    this._responseCallback = function (xhr) {
      var body = JSON.parse(xhr.responseText);
      var session = new Session(body.token);
      Object.freeze(session);
      return session;
    };
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
    return this;
  }
}

export class CreateEmailRequest extends AccountsRequest {
  constructor(email, password, confirmPassword) {
    var body = {'email': email, 'password': password, 'confirm_password': confirmPassword};
    var url = '/v0/gamer/account/email/create';
    super('POST', url, null, body);
    this._responseCallback = function (xhr) {
      var body = JSON.parse(xhr.responseText);
      var session = new Session(body.token);
      Object.freeze(session);
      return session;
    };
  }

  name(name) {
    this._body.name = name;
    return this;
  }

  nickname(nickname) {
    this._body.nickname = nickname;
    return this;
  }

  session(session) {
    if (session != null && !session.hasOwnProperty('_token')) {
      throw new Error('Invalid Session Object');
    }

    this._session = session;
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
