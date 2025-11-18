import { TaskResult } from "@/interfaces/server";
import {  QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import { CONSTANS } from "@/config/DDBConstans";
import { execQueryCommand } from "@/utils/aws";

export class AuthDTO  {

    static async login(username: string, password: string):Promise<TaskResult<{success: true}>> {
        const params: QueryCommandInput = {
            TableName: CONSTANS.DB_NAMES.USERS,
            IndexName: "username-id-index",
            ExpressionAttributeNames: {
                "#nm": "username"
            },
            KeyConditionExpression: "#nm = :um",
            ExpressionAttributeValues: {
                ":um": username
            }
        }
        const searchResponse = await execQueryCommand<{username:string, password:string}>(params)
        console.log(searchResponse)
         if(!searchResponse.success) return searchResponse
        if(!searchResponse.data[0]) return {success: false,message: "You don´t exists :(" }
        const currentUser = searchResponse.data[0]
        if(currentUser.password !== password) return {
               success: false,
               message: 'Verifica tus credenciales' 
        }
        return {success: true}
    }
}

/*
const refresToken = jwt.sign({
        //exp: Math.floor(Date.now() / 1000) + (60 * 5),
        singed: true,
        role: "admin",
        //iss: "rorro",
        //aud: 'licon'
    }, 'secret', { expiresIn: '5m', audience: 'licon', issuer: 'rorro' })
    // , { audience: '', issuer}

    const refreshToken = randomBytes(64).toString('hex');

    try {
        const decoded = jwt.verify(refresToken, 'secret') as Record<string, string>

        const params: PutCommandInput = {
            TableName: 'UserSessions',
            Item: {
                username,
                createdAt: new Date().toISOString(),
                session: refresToken,
                validSub: Math.floor(Date.now() / 1000) + (60 * 5)
            }
        }
        const saveResponse = await execPutCommand(params)
        if (!saveResponse.success) return res.status(500).json({ message: saveResponse.message })
        //7 * 24 * 60 * 60 * 1000
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; SameSite=Strict; secure; Path=/; Max-Age=${1000 * 60 * 60}`)
        const accessToken = uuidv4()
        return res.status(200).json({ username, token: accessToken })
    } catch (e) {
        return res.status(401).json({ message: 'Invalid token' })
    }
        */