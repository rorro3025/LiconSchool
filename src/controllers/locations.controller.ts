import { NextApiRequest, NextApiResponse } from "next";
import { AWSLocation } from "./Location";
import { randomUUID } from "crypto"
import { PutCommandInput, PutCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDBDocumentClient } from "@/config/aws";

export const getOne = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query as { id: string };

    const locationService = new AWSLocation();

    try {
        const geofence = await locationService.getOne('6dce34de-2581-4395-a019-869718761229', 1);
        res.status(200).json(geofence);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Unknown error occurred" });
        }
    }
};

export const saveRoute = async (req: NextApiRequest, res: NextApiResponse) => {
    const { lat, lgn } = req.body
    console.log(req.body)
    const username = 'Rorro'
    const endpoint = new Date().toISOString()
    const id = randomUUID()

    const params: PutCommandInput = {
        TableName: "UserSubscriptionDevelopment",
        Item: {
            username,
            endpoint,
            id,
            location: { lat, lgn },
            validSub: Math.floor(Date.now() / 1000) + (60 * 5)
        }
    }
    try {
        console.log(params)
        await dynamoDBDocumentClient.send(new PutCommand(params))
        return res.status(202).json({ message: 'receivef' })
    } catch (er) {
        const { message } = er as Error
        return res.status(500).json({ message })
    }

}