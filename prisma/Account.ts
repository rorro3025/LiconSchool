import { PrismaClient } from "../generated/client";
export class Accounts {
  constructor() {
    console.log("Connecting to postgresql...");
  }

  getAll = async () => {
    const prisma = await this.connect();
    try {
      const accounts = await prisma.account.findMany({
        include: {
          AccountNature: true,
        }
      });
      console.log(accounts);
      await this.disconnect(prisma);
      return accounts;
    } catch (err) {
      await this.disconnect(prisma);
      console.log(err);
    }
  };

  saveOne = async (name: string, nature: number) => {
    const prisma = await this.connect();
    try {
      const account = await prisma.account.create({
        data: {
          name,
          nature,
        },
      });
      await this.disconnect(prisma);
      return account;
    } catch (err) {
      const { message } = err as Error;
      await this.disconnect(prisma);
      console.log(err);
      return { message }
    }
  };

  connect = async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
  };

  disconnect = async (prisma: PrismaClient) => {
    await prisma.$disconnect();
    console.log("Disconnected from postgresql");
  };
}
