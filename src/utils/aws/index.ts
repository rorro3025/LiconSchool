import { ScanCommand, GetCommand, PutCommand, QueryCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { PutCommandInput, ScanCommandInput, GetCommandInput, QueryCommandInput, UpdateCommandInput } from '@aws-sdk/lib-dynamodb'
import type { TaskResult, FailedTask } from "@/interfaces/server";
import { dynamoDBDocumentClient } from "@/config/aws";

const processDynamoError = (e: Error, tableName: string): FailedTask => {
    const dt: Record<string, string> = {
        'ProvisionedThroughputExceededException': 'Read or write capacity exeded',
        'ResourceNotFoundException': 'Table not found',
        'AccessDeniedException': 'Access denied for this table',
        'ConditionalCheckFailedException': 'Condition expression failed'
    }
    return {
        success: false,
        message: `${dt[e.name] || e.message} on (${tableName})`
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
        return processDynamoError(e as Error, params.TableName as string)
    }
}

export const execGetCommand = async <E>(params: GetCommandInput): Promise<TaskResult<{success: true, data: E}>> => {
    try {
        const result = await dynamoDBDocumentClient.send(new GetCommand(params))
        return {
            success: true,
            data: result.Item as E
        }
    } catch (e) {
        return processDynamoError(e as Error, params.TableName as string)
    }
}

export const execQueryCommand = async <E>(params: QueryCommandInput): Promise<TaskResult<{ success: true, data: E[] }>> => {
    let results: E[] = []
    let lastEvaluatedKey = null

    do {
        try {
            const result = await dynamoDBDocumentClient.send(new QueryCommand(params))
            if (result.LastEvaluatedKey) lastEvaluatedKey = result.LastEvaluatedKey
            results = results.concat(result.Items as E[])
        } catch (e) {
            return processDynamoError(e as Error, params.TableName as string)
        }
    } while (lastEvaluatedKey)

    return {
        success: true,
        data: results
    }
}

export const execScanCommand = async <E>(params: ScanCommandInput): Promise<TaskResult<{ success: true, data: E[] }>> => {
    let results: E[] = []
    let lastEvaluatedKey = null

    do {
        try {
            const result = await dynamoDBDocumentClient.send(new ScanCommand(params));
            if (result.LastEvaluatedKey) lastEvaluatedKey = result.LastEvaluatedKey;
            results = results.concat(result.Items as E[])
        } catch (e) {
            return processDynamoError(e as Error, params.TableName as string)
        }
    } while (lastEvaluatedKey)

    return {
        success: true,
        data: results
    }
}


export const execUpdateCommand = async (params: UpdateCommandInput) => {
    try {
        const result = await dynamoDBDocumentClient.send(new UpdateCommand(params))
        console.log(result)
        return {
            success: true,
            data: result.Attributes
        }
    } catch (e) {
        return processDynamoError(e as Error, params.TableName as string)
    }
}