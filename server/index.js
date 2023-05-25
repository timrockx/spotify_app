require('dotenv').config();


// environment variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 8888;

if (process.env.NODE_ENV !== 'production') {
    REDIRECT_URI = 'http://localhost:8888/callback';
    FRONTEND_URI = 'http://localhost:3000';
}

// import packages and required files
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');


// random string for state parameter
const generateRandomString = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


// create express app instance with cors enabled
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// instantiate the spotify web api wrapper
var spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});


app.get('/', (req, res) => {
    res.send('Spotify App Server');
})


// login route will create an authorization url that the user must accept
// will redirect to the callback URL on success
app.get('/login', (req, res) => {
    var state = generateRandomString(16);

    // user-top-read for top artists, etc.
    // user-read-private & user-read-email for profile info
    // use-read-playback-state for status
    var scopes = ['user-read-private', 'user-read-email', 'user-top-read', 'user-follow-read'];
    res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

// callback route after user accepts authorization
app.get('/callback', (req, res) => {

    var code = req.query.code || null;
    var state = req.query.state || null;
    var error = req.query.error;

    if(error) {
        console.log('Callback Error: ', error);
        return;
    }

    spotifyApi.
        authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);
            console.log('expires in: ', expires_in);
            

            // interval for refreshing the token
            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();;
                spotifyApi.setAccessToken(data.body['access_token']);
                console.log('refreshing token: ', data.body['access_token']);
            }, expires_in / 2 * 1000);

            // redirect and pass token to the browser
            res.redirect(
                `${FRONTEND_URI}/?access_token=${access_token}&refresh_token=${refresh_token}`
            );

        })
        .catch(err => {
            console.log('Authorization Code Grant Error: ', err);
        }) 
});

// get user profile
app.get('/me', (req, res) => {


    spotifyApi.getMe()
        .then(data => {
            console.log('my profile: ', data.body);
            res.send(data.body);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:106 ~ app.get me ~ err:", err)
        })
});


// get users followings
app.get('/following', (req, res) => {

    spotifyApi.getFollowedArtists()
        .then(data => {
            // console.log('followed artists: ', data.body);
            res.send(data.body);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:120 ~ app.get following ~ err:", err)
        })
})

// playback state if user is active
app.get('/playback-state', (req, res) => {

    spotifyApi.getMyCurrentPlaybackState()
        .then(data => {
            // console.log('playback state: ', data.body);
            res.send(data.body.device);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:133 ~ app.get playback ~ err:", err)
        })
});


// top artists
app.get('/top-artists', (req, res) => {

    spotifyApi.getMyTopArtists()
        .then(data => {
            // console.log('top artists: ', data.body.items);
            res.send(data.body.items);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:147 ~ app.get top artists~ err:", err.message)
        })
});

// top tracks
app.get('/top-tracks', (req, res) => {

    spotifyApi.getMyTopTracks()
        .then(data => {
            // console.log('top tracks: ', data.body.items[0].artists);
            res.send(data.body.items);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:160 ~ app.get top tracks ~ err:", err)
        })
});


// app on port 8888
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

module.exports = app;

