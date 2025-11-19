import { createOAuth2Client } from "@/lib/google";
import { NextApiHandler } from "next";
import { execPutCommand } from "@/utils/aws";
import { PutCommandInput } from "@aws-sdk/lib-dynamodb";


const handler: NextApiHandler = async (req, res) => {
    console.log('reach callback')
    try {
        const code = req.query.code as string
        if (!code) return res.status(400).send('no code')

        const authClient = createOAuth2Client();
        const { tokens } = await authClient.getToken(code);

        // tokens contains access_token, refresh_token (if first consent), expiry_date, etc.
        const putParams: PutCommandInput = {
            TableName: "UserSessions",
            Item: {
                username: 'RHernandez',
                createdAt: new Date().toISOString(),
                tokens
            }
        }

        const response = await execPutCommand(putParams)
        if (!response.success) return res.end()

        // Guard: remove id_token from storage if you don't need it
        console.log('tokens', tokens)
        res.writeHead(302, { Location: '/' });
        res.end()
    } catch (e) {
        console.log(e)
        res.status(500).send('Auth error')
    }
}

export default handler