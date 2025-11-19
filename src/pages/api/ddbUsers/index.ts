import { NextApiHandler } from "next";
import { getAll } from "@/controllers/users/user.controller";

const handler:NextApiHandler = (req, res) => {
    if(req.method ==='GET') return getAll(req, res)
    return res.status(405).json({message:  'Method not allowed'})
}

export default handler