// environment variables
const CLIENT_ID = 'f03a76b3fb034d56ada610ef7d38d48a'
const CLIENT_SECRET = 'b9e98d2a39ca4bbcaff6b9e4cf531744'
let REDIRECT_URI = 'http://localhost:8888/callback';
let FRONTEND_URI = 'http://localhost:3000';
const PORT = 8888;


// import packages and required files
const express = require('express');
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


// instantiate the spotify web api wrapper
var spotifyApi = new SpotifyWebApi({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI
});


// login route will create an authorization url that the user must accept
// will redirect to the callback URL on success
app.get('/login', (req, res) => {
    var state = generateRandomString(16);
    var scopes = ['user-read-private', 'user-read-email'];
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
                const access_token = data.body['access_token'];
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

app.get('/me', (req, res) => {

    spotifyApi.getMe()
        .then(data => {
            console.log(data.body);
            res.send(data.body);
        })
        .catch(err => {
            console.log("🚀 ~ file: server.js:102 ~ app.get ~ err:", err)
        })
});     


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

