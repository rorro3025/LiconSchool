import {PrismaClient} from '../generated/client'

export class AccountEntry {
    constructor() {
        console.log('Connecting Accounting entries')
    }

    getAll = async () => {
        const prisma = await this.connect()
        try {
            const entries = await prisma.accountingEntry.findMany({
                include: {
                    RowEntry: true,
                }
            })
            return entries
        } catch(e){
            console.log(e)
            await this.disconnect(prisma)
        }
    }

    connect = async ()=>{
        const prisma = new PrismaClient()
        await prisma.$connect()
        return prisma
    }

    disconnect = async (prisma:PrismaClient) => {
        await prisma.$disconnect()
        console.log('Disconnected from postgresql')
    }
}
