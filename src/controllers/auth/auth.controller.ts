import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'
import { AuthDTO } from "./AuthDTO";
import { CONSTANS } from "@/config/DDBConstans";

export const login = async (req: NextApiRequest, res: NextApiResponse) => {

    const { username, password } = req.body as { username: string, password: string }
    if (!username || !password) return res.status(400).json({ message: 'Missing username or password' })
    const loginResponse = await AuthDTO.login(username, password)
    if(!loginResponse.success) return res.status(500).json({message: loginResponse.message})

        const refreshToken = jwt.sign({
        singed: true,
        role:"employee"
    }, CONSTANS.SECRETS.JWT) 

    const sessionToken = randomBytes(64).toString('hex');

    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; SameSite=Strict; secure; Path=/; Max-Age=${1000 * 60 * 60}`)

    return res.status(200).json({
        username, 
        sessionToken
    })
}

export const logout = (_req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie', `refreshToken=${null}; HttpOnly; SameSite=Strict; secure; Path=/; Max-Age=${0}`)
    return res.status(204).json({ message: 'nil' })
}

const singUp = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, age, email, name, password } = req.body
    //const userDTO = new UserDTO(name, 'colab', password)
}
