
import { NextApiHandler } from "next";
import { getAuthURL } from '@/lib/google'
import { tokenValidation } from "@/utils";
//import https from 'node:https'

const getSapData = async () => {
    try {
        const response = await fetch('https://pruebas.licon.com.mx:50000/b1s/v2/', {
            method: "POST",
            body: JSON.stringify({
                CompanyDB: "labotarorios_licon1",
                UserName: "Manager",
                Password: "M4n4g3r",
                Language: 23
            })
        })
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

const handler: NextApiHandler = (req, res) => {
    if (req.method === 'GET') {
        const user = tokenValidation(req)
        if (!user) return res.status(401).json({ message: "Unauthorized" })
        const url = getAuthURL()
        return res.status(200).json({ url })
    }
    return res.status(405).end()
}

export default handler;