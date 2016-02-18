var jsdom  = require('jsdom');
var assert = require('assert');
var expect = require('chai').expect;
var fs = require('fs');

var w, client;

var timestamp = new Date().getTime();
var staticSession, session, staticGamerId, gamerId, messageId, matchId;

var config = JSON.parse(fs.readFileSync('./test/test-config.json'));
var apikey = config['apikey']
    staticAnonymousId = config['static_anonymous_id'],
    anonymousId = config['anonymous_id'] + timestamp,
    email = config['email'] + timestamp + '@heroiclabs.com',
    nickname = config['nickname'] + timestamp,
    achievementId = config['achievement_id'],
    leaderboardId = config['leaderboard_id'],
    scriptId = config['script_id'];

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
      client = new w.Client(apikey);
      done(errors);
    }
  });
});

describe('', function() {
  it('Ping', function() {
    var request = new w.PingRequest();
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(200);
    });
  });

  it('Server', function() {
    var request = new w.ServerRequest();
    return client.execute(request).then(function (r) {
      expect(r.body.time).to.be.above(0);
    });
  });

  it('Game', function() {
    var request = new w.GameGetRequest();
    return client.execute(request).then(function (r) {
      expect(r.body.name).to.exist;
      expect(r.body.description).to.exist;
      expect(r.body.created_at).to.be.above(0);
      expect(r.body.updated_at).to.be.above(0);
    });
  });

  it('Login Anonymously', function() {
    var request = new w.LoginAnonymousRequest(staticAnonymousId);
    return client.execute(request).then(function (r) {
      expect(r.body._token).to.exist;
      staticSession = r.body;
    });
  });

  it('Create Email Account', function() {
    var request = new w.CreateEmailRequest(email, email, email);
    request.name('Heroic Labs').nickname(nickname);
    return client.execute(request).then(function (r) {
      expect(r.body._token).to.exist;
      session = r.body;
    });
  });

  it('Link Anonymous Account to Email', function() {
    var request = new w.LinkAnonymousRequest(session, anonymousId);
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Check Account', function() {
    var request = new w.CheckAnonymousRequest(anonymousId);
    request.session(session);
    return client.execute(request).then(function (r) {
      expect(r.body.exists).to.be.true;
      expect(r.body.current_gamer).to.be.true;
    });
  });

  it('Unlink Anonymous Account', function() {
    var request = new w.UnlinkAnonymousRequest(session, anonymousId);
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Get Static Gamer', function() {
    var request = new w.GamerGetRequest(staticSession);
    return client.execute(request).then(function (r) {
      staticGamerId = r.body.gamer_id;
    });
  });

  it('Get Gamer', function() {
    var request = new w.GamerGetRequest(session);
    return client.execute(request).then(function (r) {
      expect(r.body.name).to.be.equal('Heroic Labs');
      expect(r.body.nickname).to.be.equal(nickname);
      expect(r.body.email).to.be.equal(email);
      expect(r.body.created_at).to.be.above(0);
      expect(r.body.profiles.length).to.be.equal(1);
      expect(r.body.profiles[0].type).to.be.equal('email');
      expect(r.body.profiles[0].id).to.be.equal(email);
      expect(r.body.profiles[0].created_at).to.be.above(0);
      gamerId = r.body.gamer_id;
    });
  });

  it('Put Storage', function() {
    var request = new w.StoragePutRequest(session, 'storage', {'data' : 'payload'});
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Get Storage', function() {
    var request = new w.StorageGetRequest(session, 'storage');
    return client.execute(request).then(function (r) {
      expect(r.body.value.data).to.be.equal('payload');
    });
  });

  it('Delete Storage', function() {
    var request = new w.StorageDeleteRequest(session, 'storage');
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Get All Achievements', function() {
    var request = new w.AchievementListRequest();
    request.session(session);
    return client.execute(request).then(function (r) {
      expect(r.body.count).to.be.equal(1);
      expect(r.body.achievements[0].state).to.be.equal("secret");
    });
  });

  it('Submit Achievement', function() {
    var request = new w.AchievementUpdateRequest(session, achievementId, 3);
    return client.execute(request).then(function (r) {
      expect(r.body.count).to.be.equal(3);
    });
  });

  it('Get All Leaderboards', function() {
    var request = new w.LeaderboardListRequest();
    return client.execute(request).then(function (r) {
      expect(r.body.count).to.be.equal(1);
      expect(r.body.leaderboards[0].type).to.be.equal('rank');
    });
  });

  it('Submit Leaderboard', function() {
    var scoretags = {'type':'websdktest'};
    var request = new w.LeaderboardUpdateRequest(staticSession, leaderboardId, 10);
    request.scoretags(scoretags);
    return client.execute(request).then(function (r) {
      expect(r.body.scoretags['type']).to.be.equal('websdktest');
      expect(r.body.score).to.be.equal(10);
    });
  });

  it('Get Leaderboard Rank', function() {
    var scoretags = {'type':'websdktest'};
    var request = new w.LeaderboardAndRankGetRequest(staticSession, leaderboardId);
    request.withScoretags().limit(11).autoOffset();
    return client.execute(request).then(function (r) {
      expect(r.body.rank.rank).to.be.above(1);
      expect(r.body.rank.score).to.be.equal(10);
      expect(r.body.leaderboard.leaderboard_id).to.be.equal(leaderboardId);
      expect(r.body.leaderboard.type).to.be.equal('rank');
      expect(r.body.leaderboard.limit).to.be.equal(11);
      expect(r.body.leaderboard.offset).to.be.equal(0);
    });
  });

  it('Execute Mailbox Script', function() {
    var request = new w.ExecuteScriptRequest(scriptId);
    request.session(session);
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(200);
    });
  });

  it('List Messages', function() {
    var request = new w.MessageListRequest(session);
    return client.execute(request).then(function (r) {
      expect(r.body.count).to.be.equal(2);
      expect(r.body.messages[0].created_at).to.be.above(0);
      expect(r.body.messages[0].message_id).to.not.be.null;
      messageId = r.body.messages[0].message_id;
    });
  });

  it('Read Message', function() {
    var request = new w.MessageReadRequest(session, messageId);
    request.withNoBody();
    return client.execute(request).then(function (r) {
      expect(r.body.read_at).to.be.above(0);
    });
  });

  it('Put Shared Storage', function() {
    var request = new w.SharedStoragePutRequest(session, 'storage', {'data' : 'payload'});
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Get Shared Storage', function() {
    var request = new w.SharedStorageGetRequest(session, 'storage');
    return client.execute(request).then(function (r) {
      expect(r.body.public.data).to.be.equal('payload');
    });
  });

  it('Patch Shared Storage', function() {
    var request = new w.SharedStoragePatchRequest(session, 'storage', {'timestamp':timestamp});
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Search Shared Storage', function(done) {
    setTimeout(function() {
      var request = new w.SharedStorageSearchRequest(session, 'value.public.timestamp:' + timestamp);
      request.filterKey('storage');
      client.execute(request).then(function (r) {
        expect(r.body.results[0].public.data).to.be.equal('payload');
        expect(r.body.results[0].public.timestamp).to.be.equal(timestamp);
        done();
      });
    }, 1500);
  });

  it('Delete Shared Storage', function() {
    var request = new w.SharedStorageDeleteRequest(session, 'storage');
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Create Direct Match', function() {
    var request = new w.MatchCreateRequest(session, [staticGamerId]);
    request.addFilter('device=websdk');
    return client.execute(request).then(function (r) {
      expect(r.body.whoami).to.be.equal(nickname);
      expect(r.body.whoami_gamer_id).to.be.equal(gamerId);
      expect(r.body.turn).to.be.equal(nickname);
      expect(r.body.turn_gamer_id).to.be.equal(gamerId);
      expect(r.body.filters[0]).to.be.equal('device=websdk');
      expect(r.body.created_at).to.be.above(0);
      matchId = r.body.match_id;
    });
  });

  it('Submit Turn', function() {
    var request = new w.MatchTurnSubmitRequest(session, matchId, 0, gamerId, "data=turn_data");
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

  it('Get Turns', function() {
    var request = new w.MatchTurnGetRequest(session, matchId, 0);
    return client.execute(request).then(function (r) {
      expect(r.body.match_id).to.be.equal(matchId);
      expect(r.body.turns[0].gamer_id).to.be.equal(gamerId);
      expect(r.body.count).to.be.equal(1);
      expect(r.body.total).to.be.equal(1);
    });
  });


  it('Get Matches', function() {
    var request = new w.MatchListRequest(session);
    return client.execute(request).then(function (r) {
      expect(r.body.matches.length).to.be.equal(1);
    });
  });

  it('Get Matches Since', function() {
    var request = new w.MatchesSinceRequest(session, timestamp);
    return client.execute(request).then(function (r) {
      expect(r.body.matches.length).to.be.equal(1);
      expect(r.body.matches[0].turns.length).to.be.equal(1);
    });
  });

  it('End Match', function() {
    var request = new w.MatchTurnEndRequest(session, matchId);
    return client.execute(request).then(function (r) {
      expect(r.status).to.be.equal(204);
    });
  });

});
