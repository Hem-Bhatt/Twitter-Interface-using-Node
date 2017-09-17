# Twitter-Interface-using-Node

Uses Twitter’s REST API to access Twitter profile information and render it to a user. The page automatically authenticates access to your Twitter profile. Requires config.js file containing Twitter authentication in the following format. Just add your own keys and access tokens from your twitter app.

var config = {
    consumer_key:         '...'
  , consumer_secret:      '...'
  , access_token:         '...'
  , access_token_secret:  '...'
}

module.exports = config;

**NOTE**
Keys & Access tokens require read, write, and direct messages access!

![alt text](https://raw.githubusercontent.com/Hem-Bhatt/Twitter-Interface-using-Node/master/screenshots/twiti.png)
