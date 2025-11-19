import {
    GetGeofenceCommand,
    GetDevicePositionCommand,
    BatchDeleteGeofenceCommand,
    BatchEvaluateGeofencesCommand,
    BatchUpdateDevicePositionCommand,
    PutGeofenceCommand,
    ListGeofencesCommand,
    ListDevicePositionsCommand
} from '@aws-sdk/client-location'
import type {
    GetGeofenceCommandInput,
    GetDevicePositionCommandInput,
    ListDevicePositionsCommandInput,
    BatchDeleteGeofenceCommandInput,
    BatchEvaluateGeofencesCommandInput,
    BatchUpdateDevicePositionCommandInput,
    PutGeofenceCommandInput,
    ListGeofencesCommandInput
} from '@aws-sdk/client-location'
import { GetCommandInput } from '@aws-sdk/lib-dynamodb'

import { locationClient, dynamoDBDocumentClient } from "@/config/aws";
import { GetItemCommand } from '@aws-sdk/client-dynamodb';

const CollectionName = "TestCRMV1"
const TrackerName = 'tracker1'


export class AWSLocation {

    constructor() { }

    async getAllGeofences() {
        try {
            const response = await locationClient.send(new ListGeofencesCommand({
                CollectionName
            }));
            return response;
        } catch (error) {
            console.error("Error fetching geofences:", error);
            throw new Error("Could not retrieve geofences");
        }
    }

    async getOne(uuid: string, v: number) {

        try {
            if (v === 1) {
                const response = await locationClient.send(new GetGeofenceCommand({
                    CollectionName,
                    GeofenceId: uuid
                }));
                return response;
            }
            if (v === 2) {
                const params: GetCommandInput = {
                    TableName: CollectionName,
                    Key: {
                        id: uuid
                    }
                };
                const response = await dynamoDBDocumentClient.send(new GetItemCommand(params));
                return response;
            }
        } catch (error) {
            console.error("Error fetching geofence:", error);
            throw new Error("Could not retrieve geofence");
        }

    }
}
