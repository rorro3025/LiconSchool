import { RowDataPacket } from "mysql2";
import { usePool } from "@/sqlConfig";

export class Origin {
    type: string
    name: string
    entity: number

    constructor(name: string, email: string, role: number) {
        this.email = email
        this.name = name
        this.role = role
    }

    getAll = async () => {
        try {
            const query = "select t1.idUser, t1.email,t1.created_at,t1.updated_at, t1.name,t2.name as role from users t1, roles t2 where t1.role = t2.id"
            const [rows] = await usePool.query<RowDataPacket[]>(query)
            usePool.end()
            return rows
        } catch (e) {
            console.log(e)
            //@ts-ignore
            return e.message
        }
    }

    saveOne = async () => {
        try {
            const query = "insert into users (name, email, role) values (?,?,?)"
            //usePool.connect()
            const res = await usePool.query(query, [this.name, this.email, this.role])
            //usePool.end()
            return {
                success: true,
                data: res
            }
        } catch (e) {
            return {
                success: false,
                message: String(e)
            }
        }
    }
}