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

      uri = HEROICLABS_API + request.url;
      if (request.type === 'accounts') {
        uri = HEROICLABS_ACCOUNTS + request.url;
      }

      if (request.session != null) {
        gamerToken = request.session.gamerToken;
      }

      if (request.queryParams) {
        uri += '?';
        let counter = 0;
        for (let key of request.queryParams) {
          uri += encodeURIComponent(key) + '=' + encodeURIComponent(request.queryParams[key]);
          counter++;
          if (counter < request.queryParams.length) {
            uri += '&';
          }
        }
      }

      xhr.timeout = 5000;
      xhr.onreadystatechange = () => {
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            if (request.responseCallback != null) {
              let response = new Response(xhr, request, request.responseCallback(xhr));
              response.freeze();
              resolve(response);
            } else {
              let response = new Response(xhr, request);
              response.freeze();
              resolve(response);
            }
          } else {
            let response = new Response(xhr, request);
            response.freeze();
            reject(response);
          }
        };
        xhr.onerror = function () {
          let response = new Response(xhr, request);
          response.freeze();
          reject(response);
        };
        xhr.ontimeout = function () {
          let response = new Response(xhr, request);
          response.freeze();
          reject(response);
        };
      };

      xhr.open(request.method, uri, true);

      xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this._apikey + ':' + gamerToken));
      xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Accept', 'application/json');
      // xhr.setRequestHeader('User-Agent', '');

      xhr.send(JSON.stringify(request.body));
    });
  }
}

export class Response {
  constructor(jsXHR, request, body) {
    this.xhr = jsXHR;
    this.request = request;
    this.body = jsXHR.responseBody;
    if (body != null) {
      this.body = body;
    }
    this.status = jsXHR.status;
    this.message = jsXHR.statusText;
  }
}
