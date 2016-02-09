import {AccountsRequest} from './request';

class UnlinkRequest extends AccountsRequest {
  constructor(session, id, provider) {
    var body = {'id': id};
    var url = '/v0/gamer/unlink/' + provider;
    super('POST', url, session, body);
  }
}

export class UnlinkTangoRequest extends UnlinkRequest {
  constructor(session, id) {
    super(session, id, 'tango');
  }
}

export class UnlinkFacebookRequest extends UnlinkRequest {
  constructor(session, id) {
    super(session, id, 'facebook');
  }
}

export class UnlinkGoogleRequest extends UnlinkRequest {
  constructor(session, id) {
    super(session, id, 'google');
  }
}

export class UnlinkAnonymousRequest extends UnlinkRequest {
  constructor(session, id) {
    super(session, id, 'anonymous');
  }
}

export class UnlinkEmailRequest extends AccountsRequest {
  constructor(session, email) {
    var body = {'email': email};
    var url = '/v0/gamer/unlink/email';
    super('POST', url, session, body);
  }
}
