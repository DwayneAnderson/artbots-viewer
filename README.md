# ArtBotsViewer

### What does this do?

This uses the [Twitter API](https://developer.twitter.com/) to retrieve tweets containing images from the popular [ArtBots List](https://twitter.com/i/lists/976556889981906945) by [@andreitr](https://twitter.com/andreitr) and display them in a web-based slideshow.

### Requirements

* Node version >= v14.17.0 - [nvm](https://github.com/nvm-sh/nvm) strongly recommended
* [Twitter API Credentials - OAuth 1.0a](https://developer.twitter.com/en/docs/authentication/oauth-1-0a)

### Installation:
1) `git clone git@github.com:DwayneAnderson/artbots-viewer.git`
2) `cd artbots-viwer && yarn install`
3) Copy `.env.example` as `.env` and update values:
* `TWITTER_API_KEY`
* `TWITTER_API_KEY_SECRET`
* `TWITTER_API_ACCESS_TOKEN`
* `TWITTER_API_ACCESS_TOKEN_SECRET`
4) `yarn run server` to run server on `http://localhost:5000`. This will return the static build and expose the API.
6) Optionally, `yarn run client` to serve the client on `http://localhost:3000` tp leverage Hot Module Replacement while developing client.
