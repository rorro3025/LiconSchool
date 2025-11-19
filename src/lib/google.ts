
import { google } from 'googleapis'
import { CONSTANS } from '../config/DDBConstans'
import type { OAuth2Client } from 'google-auth-library';

const createOAuth2Client = () => {
    console.log(
        "🍓", CONSTANS.SECRETS.GOOGLE_CLIENT_ID,
        "🍓", CONSTANS.SECRETS.GOOGLE_CLIENT_SECRET
    )
    return new google.auth.OAuth2(
        CONSTANS.SECRETS.GOOGLE_CLIENT_ID,
        CONSTANS.SECRETS.GOOGLE_CLIENT_SECRET,
        'http://localhost:3000/api/calendar/callback')
}

const getAuthURL = () => {
    const auth2Client = createOAuth2Client()
    const scopes = [
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events"
    ]

    return auth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: scopes
    })
}

const getCalendarClient = (client: OAuth2Client) => {
    return google.calendar({ version: "v3", auth: client })
}

export { getAuthURL, getCalendarClient, createOAuth2Client }