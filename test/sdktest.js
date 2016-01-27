var jsdom  = require('jsdom');
var assert = require('assert');

var w, client;

before(function(done) {
  jsdom.env({
    'html': '<html><body></body></html>',
    'scripts': [
      __dirname + '/../node_modules/jsdom/lib/jsdom/living/xmlhttprequest.js',
      __dirname + '/../webpack-build/heroiclabs-sdk.js'
    ],
    'done': function(errors, window) {
      window.btoa = function(str) {
        return new Buffer(str.toString(), 'binary').toString('base64');
      };

      w = window.main;
      client = new w.Client('344597023e7f4c3289732054bd42e898');
      done(errors);
    }
  });
});

describe('', function() {
  it('Ping', function() {
    var ping = new w.PingRequest();
    return client.execute(ping).then(function (response) {
      assert.strictEqual(response.status, 200);
    });
  });
});
