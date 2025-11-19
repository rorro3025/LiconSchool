import { NextApiHandler } from "next";
import { createOAuth2Client, getCalendarClient } from '@/lib/google'
// get Token function

const getTokens: any = 'asdk'

const handler: NextApiHandler = async (req, res) => {
    const tokens = getTokens
    if (!tokens) return res.status(401).json({ error: 'Not authenticated' })
    const authClient = createOAuth2Client();
    authClient.setCredentials(tokens)

    try {
        const calendarClient = getCalendarClient(authClient)
        const resp = await calendarClient.calendarList.list()
        return res.status(200).json(resp.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default handler