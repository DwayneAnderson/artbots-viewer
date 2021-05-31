# ArtBotsViewer

ArtBotsViewer leverages the [Twitter API](https://developer.twitter.com/) to retrieve tweets containing images or looping videos from [Twitter lists](https://help.twitter.com/en/using-twitter/twitter-lists)  and display them in a web-based slideshow. (The popular [ArtBots List](https://twitter.com/i/lists/976556889981906945) by [@andreitr](https://twitter.com/andreitr) was the original inspiration.)

### Requirements

* [Node.js](https://nodejs.org/) version >= v14.17.0 - [nvm](https://github.com/nvm-sh/nvm) strongly recommended
* [yarn](https://yarnpkg.com/) package manager
* [Twitter API Credentials - OAuth 1.0a](https://developer.twitter.com/en/docs/authentication/oauth-1-0a)

### Installation:
1) `git clone git@github.com:DwayneAnderson/artbots-viewer.git`
2) `cd artbots-viwer`
3) `yarn install`
* If `yarn` is not available on your system, run `npm add -g yarn` and repeat step 3.
4) `cp .env.example .env`
* makes a copy of `.env.example` as `.env`, which will be used to configure your installation's runtime environment.
5) Edit `.env`, modifying the following values:
* `TWITTER_API_KEY`
* `TWITTER_API_KEY_SECRET`
* `TWITTER_API_ACCESS_TOKEN`
* `TWITTER_API_ACCESS_TOKEN_SECRET`
6) `yarn run build`
* compiles the static build from `/src`
7) `yarn run server`
* returns the static build of the client application at `http://localhost:5000` and expose the API to the client.
8) Optionally, `yarn run client`
* serves the client at `http://localhost:3000`, allowing for [HMR](https://webpack.js.org/concepts/hot-module-replacement/).

-----------
#### Twitter Lists
* ArtBots: 976556889981906945 (default)
  * [https://twitter.com/i/lists/976556889981906945](https://twitter.com/i/lists/976556889981906945)
  * [http://localhost:5000/list/976556889981906945](http://localhost:50000/list/976556889981906945)
* BeesAndBombs: 1394666258121957384
  * [https://twitter.com/i/lists/1394666258121957384](https://twitter.com/i/lists/1394666258121957384)
  * [http://localhost:5000/list/1394666258121957384](http://localhost:50000/list/1394666258121957384)