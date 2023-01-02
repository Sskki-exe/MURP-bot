// Reference: https://www.youtube.com/watch?v=-rcRf7yswfM

// Gmail Details
const botGmail = "murp@monashclubs.org";

// Import APIs
const nodemailer = require('nodemailer');
const {
    google
} = require('googleapis');

// Generate a new Access Token
const creds         = require('../Credentials/gmailCreds.json');
const CLIENT_ID     = creds["web"]["client_id"];
const CLIENT_SECRET = creds["web"]["client_secret"];
const REDIRECT_URI  = creds["web"]["redirect_uris"][0];
const REFRESH_TOKEN = creds["refresh_token"];
const oAuth2Client  = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

// Send E Mail
async function sendMail(options) {
    let mailOptions = {
        to: options.to,
        from: `Monash University Role Players (MURP)<${botGmail}>`,
        subject: options.subject,
        html: options.html
    };
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: 'OAUTH2',
                user: botGmail,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}

/*
var test = {
    to: "hcho0050@student.monash.edu",
    subject: "MURP-bot Test Email",
    html: require("../email-templates/weeklyGames.json")["test"]
};
sendMail(test);
*/
module.exports = {
    sendMail
}