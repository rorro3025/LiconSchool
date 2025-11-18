import { NextApiHandler } from "next";
import { getOne, saveRoute } from '@/controllers/locations.controller'

const handler: NextApiHandler = async (req, res) => {
    if(req.method === 'GET') return getOne(req, res);
    if(req.method ==='POST') return saveRoute(req,res)
    return res.status(405).json({message: 'method unknow BH'})
};

export default handler;
