import { NextApiHandler } from "next";
import { User } from "@/SQLEntities/User";

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const user = new User('', '', 0)
        const response = await user.getAll() 
        return res.status(200).json({message: 'Success',data: response })
    }

    if(req.method === 'POST'){
        const {name, email, role} = req.body
        const user = new User(name, email, role)
        const response = await user.saveOne()
        if(response.success === false) return res.status(500).json(response.message)
        return res.status(200).json(response.data)
    }
}

export default handler 