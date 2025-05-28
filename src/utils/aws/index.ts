import { ScanCommandInput, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { TaskResult } from "@/interfaces/server";
import { dynamoDBDocumentClient } from "@/config/aws";
import { PutCommandInput, PutCommand } from "@aws-sdk/lib-dynamodb";

export const execScanCommand = async <E>(params: ScanCommandInput): Promise<TaskResult<{ success: true, data: E[] }>> => {
    try {
        const result = await dynamoDBDocumentClient.send(new ScanCommand(params))
        console.log(`Scanned ${params.TableName}: `, result.Count)
        return {
            success: true,
            data: result.Items as E[]
        }
    } catch (e) {
        if (e instanceof Error) {
            if (e.name === 'ProvisionedThroughputExceededException') {
                return {
                    success: false,
                    message: 'DynamoDB throughput exceeded, please try again later'
                };
            }
            if (e.name === 'ResourceNotFoundException') {
                return {
                    success: false,
                    message: 'The requested DynamoDB table was not found'
                };
            }
            if (e.name === 'AccessDeniedException') {
                return {
                    success: false,
                    message: 'Access denied to DynamoDB resource'
                };
            }
            return {
                success: false,
                message: `DynamoDB scan error: ${e.message}`
            };
        }
        return {
            success: false,
            message: 'Unknown DynamoDB error occurred'
        };
    }
}

export const execPutCommand = async <E>(params: PutCommandInput): Promise<TaskResult<{ success: true, data: E }>> => {
    try {
        const result = await dynamoDBDocumentClient.send(new PutCommand(params));
        console.log(`Put item in ${params.TableName}`);
        return {
            success: true,
            data: result.Attributes as E
        };
    } catch (e) {
        if (e instanceof Error) {
            if (e.name === 'ProvisionedThroughputExceededException') {
                return {
                    success: false,
                    message: 'DynamoDB throughput exceeded, please try again later'
                };
            }
            if (e.name === 'ResourceNotFoundException') {
                return {
                    success: false,
                    message: 'The requested DynamoDB table was not found'
                };
            }
            if (e.name === 'AccessDeniedException') {
                return {
                    success: false,
                    message: 'Access denied to DynamoDB resource'
                };
            }
            if (e.name === 'ConditionalCheckFailedException') {
                return {
                    success: false,
                    message: 'Conditional check failed for the item'
                };
            }
            return {
                success: false,
                message: `DynamoDB put error: ${e.message}`
            };
        }
        return {
            success: false,
            message: 'Unknown DynamoDB error occurred'
        };
    }
}
