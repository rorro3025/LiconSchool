import { RowDataPacket } from "mysql2";
import { usePool } from "@/sqlConfig";

export class Origin {
    name: string
    type: string
    entity: string

    constructor(name: string, entity: string, type: string) {
        this.name = name
        this.type = type
        this.entity = entity
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
            const res = await usePool.query(query, [this.name, this.entity, this.type])
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