import {NextApiHandler} from 'next'
import {GetCommandInput} from "@aws-sdk/lib-dynamodb";
import {CONSTANS} from "@/config/DDBConstans";
import {execGetCommand} from "@/utils/aws";
import {createOAuth2Client, getCalendarClient} from "@/lib/google";

interface Tokens {
    access_token: string,
    expiry_date: number,
    refresh_token: string,
    refresh_token_expires_in: number,
    scope: string,
    token_type: string
}

const handler: NextApiHandler = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).end()

    const getParams: GetCommandInput = {
        TableName: CONSTANS.DB_NAMES.USER_SESSIONS,
        Key: {
            username: "RHernandez",
            createdAt: "2025-11-20T17:02:51.115Z"
        }
    }

    const getResponse = await execGetCommand<{ username: string, tokens: Tokens }>(getParams)
    if (!getResponse.success) return res.status(401).json({error: 'Not authenticated'})
    const authClient = createOAuth2Client();
    authClient.setCredentials(getResponse.data.tokens)

    try {
        const calendar = getCalendarClient(authClient)
        const event = {
            summary: "Event from 'Alexita'",
            description: "Description from alexita",
            start: {dateTime: "2025-12-20T17:36:19.739Z"},
            end: {dateTime: "2025-12-20T18:36:19.739Z"}
        }

        const resp = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event
        })
        res.status(200).json(resp.data)
    } catch (e) {
        console.log(e)
        res.status(500).json({error: 'Calendar API error'})
    }
}

export default handler;