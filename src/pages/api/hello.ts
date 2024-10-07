import { NextApiRequest,NextApiResponse } from "next";

interface UserI {
    username: string
    email: string
}
export default function handler (req:NextApiRequest, res:NextApiResponse<UserI>){
    res.status(200).json({username:'rorro',email:'rorro@mail.com'})
}
