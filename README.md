Heroic Labs Web SDK
===================
The Web SDK for the Heroic Labs service.

[SDK Guide](https://heroiclabs.com/docs/guide/web/) | [SDK Reference](http://heroiclabs.github.io/heroiclabs-sdk-web/)

---

Heroic Labs is AWS for game developers. Easily add social, multiplayer, and competitive features to any kind of game. The platform handles all server infrastructure required to power games built for desktop, mobile, browser, or web. The goal is to help game studios build beautiful social and multiplayer games which work at massive scale.

For a full list of the API have a look at the [features](https://heroiclabs.com/features).

### Install
The client SDK is available on [Bower]() and on [NPM]().

Simply add this to your `bower.json` or `package.json`'s `dependencies` block:

```json
{
    "heroiclabs-sdk-web":"^0.1.4"
}
```

Once the SDK is imported, you can create a `Client` instance and begin making requests:

```java
var client = new Heroic.Client("your api key here");
var pingRequest = new Heroic.PingRequest();
client.execute(pingRequest).then(function(successResponse) {
    // This is only triggered on successful requests.
    return true;
}, function(errorResponse) {
    // This is triggered when the request has failed.
    return false;
});
```

__Note:__ More information about the project structure is available in the [guide](https://heroiclabs.com/docs/guide/android/).

The API key placeholder above __must be replaced__ with one of your own from the [Developer Dashboard](https://dashboard.heroiclabs.com/). Run your game. A request will be sent to the Game API which will verify your API key is valid and the service is reachable.

### SDK Guide

You can find the full guide for the Web SDK [online](https://heroiclabs.com/docs/guide/web/).

### Contribute

To develop on the codebase you'll need:

* [NPM](https://docs.npmjs.com/getting-started/installing-node) installed, up-to-date, and available on the path.
* [Webpack](https://webpack.github.io/docs/installation.html).

#### Setup

1. Navigate to project directory and run `npm install`.
2. Build the project by running `webpack`.
3. Run the Mocha tests via `npm test`.

All contributions to the documentation and the codebase are very welcome and feel free to open issues on the tracker wherever the documentation needs enhancements.

Pull requests are always welcome! `:)`

#### Test

To run the SDK tests, execute the following command in the project root directory:

```
npm test
```
