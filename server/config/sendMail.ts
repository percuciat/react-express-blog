const nodemailer = require('nodemailer');
import {OAuth2Client} from 'google-auth-library'

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground';
const CLIENT_ID = `${process.env.MAIL_CLIENT_ID}`;
const CLIENT_SECRET = `${process.env.MAIL_CLIENT_SECRET}`;
const CLIENT_REFRESH = `${process.env.MAIL_REFRESH_TOKEN}`;
const SENDER_MAIL = `${process.env.SENDER_EMAIL_ADDRESS}`;

const sendEmail = async (to: string, urlLog: string, msg: string) => {
    const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, OAUTH_PLAYGROUND);

    oAuth2Client.setCredentials({
        refresh_token: CLIENT_REFRESH
    });

    try {
       /* const access_token = await oAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: SENDER_MAIL,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: CLIENT_REFRESH,
                access_token
            }
        });*/
        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: "username",
                pass: "password",
            },
        });

        const mailOptions = {
            from: SENDER_MAIL,
            to: to,
            subject: 'blog mern',
            html: `
                <h1>Registration Google mail from Blog-Mern</h1>
                <a href=${urlLog}>${msg}</a>
                <p>if you get some problems with auth click ${urlLog}</p>
            `
        }

        const resultFromEmail = await transport.sendMail(mailOptions);

        return resultFromEmail;
    } catch (err) {
        console.log('ERROR GOOGLE registration', err);
        return err;
    }
};

export default sendEmail;