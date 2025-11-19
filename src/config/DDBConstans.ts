export const CONSTANS = {
    DB_NAMES: {
        USERS: 'userDevelopment',
        USER_SESSIONS: "UserSessions"
    },
    SECRETS: {
        JWT: process.env.SECRET,
        AWS_MAP: process.env.AWS_MAP_KEY,
        GOOGLE_MAP: process.env.GOOGLE_KEY,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
    }
}