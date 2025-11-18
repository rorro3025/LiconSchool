import { NextApiHandler } from "next"
import { logout } from '@/controllers/auth/auth.controller'


const handler: NextApiHandler = (req, res) => {
    if (req.method === 'POST') return logout(req, res)
    return res.status(405).json({ message: 'Method not allowed' })
}

export default handler
