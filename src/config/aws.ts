import { S3Client } from "@aws-sdk/client-s3";
import { LocationClient } from '@aws-sdk/client-location'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, TranslateConfig } from "@aws-sdk/lib-dynamodb";

const REGION_US: string = "us-east-1";

const s3Client = new S3Client({ region: REGION_US });

const dynamoDBClient = new DynamoDBClient({ region: REGION_US, credentials: {
    accessKeyId: process.env.AK,
    secretAccessKey: process.env.SK
} });

const translateConfig: TranslateConfig = {
    marshallOptions: {
        convertEmptyValues: false,
        removeUndefinedValues: false,
        convertClassInstanceToMap: false
    },
    unmarshallOptions: {
        wrapNumbers: false
    }
}

const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient, translateConfig)
const locationClient = new LocationClient({ region: REGION_US });

export { s3Client, dynamoDBDocumentClient, locationClient };

