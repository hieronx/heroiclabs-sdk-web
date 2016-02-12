const HEROICLABS_API = 'https://api.heroiclabs.com';
const HEROICLABS_ACCOUNTS = 'https://accounts.heroiclabs.com';

export class Client {
  constructor(apikey) {
    this._apikey = apikey;
  }

  execute(request) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      var uri;
      var gamerToken = '';

      uri = HEROICLABS_API + request._url;
      if (request._type === 'accounts') {
        uri = HEROICLABS_ACCOUNTS + request._url;
      }

      if (request._session != null) {
        gamerToken = request._session._token;
      }

      if (request._queryParams) {
        uri += '?';
        let counter = 0;
        let keys = Object.keys(request._queryParams);
        for (let key of keys) {
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(String(request._queryParams[key]));
          counter++;
          if (counter < keys.length) {
            uri += '&';
          }
        }
      }

      xhr.timeout = 5000;
      xhr.onreadystatechange = () => {
        xhr.onload = () => {
          let response = null;
          if (xhr.status >= 200 && xhr.status < 300) {
            if (request._responseCallback != null) {
              response = new Response(xhr, request, request._responseCallback(xhr));
            } else {
              response = new Response(xhr, request);
            }
            Object.freeze(response);
            resolve(response);
          } else {
            response = new Response(xhr, request);
            Object.freeze(response);
            reject(response);
          }
        };
        xhr.onerror = function () {
          let response = new Response(xhr, request);
          Object.freeze(response);
          reject(response);
        };
        xhr.ontimeout = function () {
          let response = new Response(xhr, request);
          Object.freeze(response);
          reject(response);
        };
      };

      xhr.open(request._method, uri, true);

      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this._apikey + ':' + gamerToken));
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Accept', 'application/json');
      // xhr.setRequestHeader('User-Agent', '');

      xhr.send(JSON.stringify(request._body));
    });
  }
}

export class Response {
  constructor(jsXHR, request, body) {
    this.xhr = jsXHR;
    this.request = request;
    this.status = jsXHR.status;
    this.message = jsXHR.statusText;

    if (body != null) {
      this.body = body;
    } else if (jsXHR.responseText !== null && jsXHR.responseText.length > 0) {
      this.body = JSON.parse(jsXHR.responseText);
    }
  }
}
