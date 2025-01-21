import {NextApiHandler} from 'next'
import {AccountEntry} from "../../../../../prisma/AccountEntry";

const handler: NextApiHandler = async (req,res ) => {
    if(req.method === 'GET') {
        const entries = new AccountEntry()
        const data = await entries.getAll()
        return res.status(200).json(data)
    }
}

export default handler