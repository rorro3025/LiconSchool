import { NextApiRequest, NextApiResponse } from 'next';
import { createJournalEntry, getAllJournalEntries } from '@/controllers/journal.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                console.log('body',req.body)
                const { odm } = req.body;
                if (!odm) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }

                const result = await createJournalEntry({ U_No_ODM: odm  });
                if (!result.success) {
                    return res.status(500).json({ message: result.message });
                }

                return res.status(201).json(result.data);
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

        case 'GET':
            try {
                const { userId } = req.query;
                if (!userId || typeof userId !== 'string') {
                    return res.status(400).json({ message: 'Missing or invalid userId' });
                }

                const result = await getAllJournalEntries(userId);
                if (!result.success) {
                    return res.status(500).json({ message: result.message });
                }

                return res.status(200).json(result.data);
            } catch (error) {
                return res.status(500).json({ message: 'Internal server error' });
            }

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
}