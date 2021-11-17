const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const crypto = require("crypto");
const scopes = require("./scopes");

const router = express.Router();
dotenv.config();

let clientId = process.env.CLIENT_ID;
let clientSecret = process.env.CLIENT_SECRET;
const FRONT_PORT = process.env.FRONT_PORT;
let redirectUri = "http://localhost:3001/api/spotify/callback";
var stateKey = "spotify_auth_state";

router.get("/auth", (req, res) => {
  var state = crypto.randomBytes(16).toString("hex");
  res.cookie(stateKey, state);

  // your application requests authorization
  let params = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    show_dialog: true,
    state: state,
  });
  res.redirect("https://accounts.spotify.com/authorize?" + params.toString());
});

router.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    let params = new URLSearchParams({
      error: "state_mismatch",
    });
    res.redirect(`http://localhost:${FRONT_PORT}/#` + params.toString());
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, (error, response, body) => {
          console.log(body);

          let id = body.id;
          let name = body.display_name;
          let params = new URLSearchParams({
            access: access_token,
            refresh: refresh_token,
            name,
            id,
          });
          res.redirect(
            `http://localhost:${FRONT_PORT}/profile?` + params.toString()
          );
        });
      } else {
        let params = new URLSearchParams({
          error: "invalid_token",
        });
        res.redirect(`http://localhost:${FRONT_PORT}/#` + params.toString());
      }
    });
  }
});

router.get("/refresh-token", (req, res) => {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

module.exports = {
  routes: router,
};
