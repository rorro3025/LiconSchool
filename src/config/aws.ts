import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient,TranslateConfig } from "@aws-sdk/lib-dynamodb";

const REGION: string = "mx-central-1";

const s3Client = new S3Client({ region: REGION });

const dynamoDBClient = new DynamoDBClient({ region: REGION });

const translateConfig:TranslateConfig = {
    marshallOptions: {
        convertEmptyValues: false,
        removeUndefinedValues: false,
        convertClassInstanceToMap: false
    },
    unmarshallOptions: {
        wrapNumbers: false
    }
}

const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient,translateConfig)

export { s3Client,dynamoDBDocumentClient };

