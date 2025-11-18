import { NextApiHandler }
    from 'next'
import { tokenValidation } from '@/utils'

const sesitiveData = [
    {
        username: "Rodrigo",
        age: 0,
        address: 'licon'
    },
    {
        username: "Karen",
        age: 0,
        address: 'licon'
    },
    {
        username: "Abigail",
        age: 0,
        address: 'licon'
    }
]

const handler: NextApiHandler = (req, res) => {
    tokenValidation(req)
    return res.status(200).json(sesitiveData)
}

export default handler