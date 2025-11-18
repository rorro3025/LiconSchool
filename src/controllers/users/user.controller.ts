import { NextApiRequest, NextApiResponse } from "next";
import { UserDTO } from "./UserDTO";

export const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await UserDTO.getAll()
    if (!response.success) return res.status(500).json({ message: response.message })
    return res.status(200).json({ success: true, data: response.data })
} 

export const register = async (req:NextApiRequest, res:NextApiResponse) => {
    const data = req.body

    const userDTO = new UserDTO(data, data.password)

    const response = await userDTO.save()
    if(!response.success) return  res.status(500).json({message: response.message})
    return res.status(200).json({message: 'Success'})
}