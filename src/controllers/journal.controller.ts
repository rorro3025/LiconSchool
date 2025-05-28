import { execPutCommand, execScanCommand } from '@/utils/aws';
import type { JournalEntryDTO } from '@/interfaces/JournalEntry.dto';
import { randomUUID } from 'crypto';

const TABLE_NAME = 'JounalCorrectiveOrder';

export const createJournalEntry = async (entry: Omit<JournalEntryDTO, 'uuid' | 'U_Fecha_inicio'| 'U_Hr_inicio' | 'U_intervalo'>) => {
    const timestamp = new Date().toISOString();
    const journalEntry: JournalEntryDTO = {
        uuid: randomUUID(),
        ...entry,
        U_Fecha_inicio: timestamp,
        U_Hr_inicio: timestamp,
        U_intervalo: 1
    };

    return await execPutCommand<JournalEntryDTO>({
        TableName: TABLE_NAME,
        Item: journalEntry
    });
};

export const getAllJournalEntries = async (userId: string) => {
    /*
    //FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': userId
            */
    return await execScanCommand<JournalEntryDTO>({
        TableName: TABLE_NAME,
    });
};