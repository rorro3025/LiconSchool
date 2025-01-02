import { NextApiHandler } from "next";
import { Accounts } from "prisma/Account";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const accounts = new Accounts();
    const data = await accounts.getAll();
    res.status(200).json(data);
  }
  if (req.method === "POST") {
    const { name, nature: natureString } = req.body;
    const accounts = new Accounts();
    const nature = parseInt(natureString);
    const data = await accounts.saveOne(name, nature) as { id?: number };
    res.status(data.id ? 200 : 500).json(data);
  }
};

export default handler;
