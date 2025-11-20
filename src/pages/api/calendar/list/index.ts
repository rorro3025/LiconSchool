import {NextApiHandler} from "next";
import {createOAuth2Client, getCalendarClient} from '@/lib/google'
import {GetCommandInput} from "@aws-sdk/lib-dynamodb";
import {CONSTANS} from "@/config/DDBConstans";
import {execGetCommand} from "@/utils/aws";

// get Token function

interface Tokens {
    access_token: string,
    expiry_date: number,
    refresh_token: string,
    refresh_token_expires_in: number,
    scope: string,
    token_type: string
}

const handler: NextApiHandler = async (req, res) => {
    const getParams: GetCommandInput = {
        TableName: CONSTANS.DB_NAMES.USER_SESSIONS,
        Key: {
            username: "RHernandez",
            createdAt: "2025-11-20T17:02:51.115Z"
        }
    }

    const getResponse = await execGetCommand<{ username: string, tokens: Tokens }>(getParams)
    if (!getResponse.success) return res.status(401).json({error: getResponse.message})
    const authClient = createOAuth2Client();
    authClient.setCredentials(getResponse.data.tokens)

    try {
        const calendarClient = getCalendarClient(authClient)
        const resp = await calendarClient.calendarList.list()
        return res.status(200).json(resp.data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export default handler