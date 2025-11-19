import { NextApiHandler } from "next"
import { login } from '@/controllers/auth/auth.controller'


const handler: NextApiHandler = (req, res) => {
    if (req.method === 'POST') return login(req, res)
    //if(req.method === 'POST') return res.status(400).json({message: 'Errr'})
    return res.status(405).json({ message: 'Method not allowed' })
}

export default handler
