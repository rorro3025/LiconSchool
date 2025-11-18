import { execPutCommand, execScanCommand } from '@/utils/aws'
import { PutCommandInput, ScanCommandInput } from '@aws-sdk/lib-dynamodb'
import {randomUUID } from 'crypto'
import { SaveUserT,UserInDB } from './user.schema'

const TableName = 'userDevelopment'

export class UserDTO implements SaveUserT{
name: string
role: string 
password: string
age: number
email: string
username: string

constructor({name, username, age, email, role }: SaveUserT, password: string){
    this.name = name
    this.role = role;
    this.password = password;
    this.age = age;
    this.email = email;
    this.username = username

}

async save(){
    const Item: UserInDB = {
        id: randomUUID(),
        createdAt: new Date().toISOString(),
        password: this.password ,
        age: this.age,
        email: this.email.toLowerCase(),
        name: this.name.toUpperCase(),
        role: this.role.toLowerCase(),
        username: this.username.toLowerCase()
    }

    const putCommand:PutCommandInput = {
        TableName,
        Item
    }
    return execPutCommand(putCommand)
}

 static async getAll() {
    const scanCommand:ScanCommandInput = {
            TableName,
            ExpressionAttributeNames: {
                "#id": "id",
                "#name": "name",
                "#um": "username",
                "#ag": "age",
                "#rl":"role",
                "#ca": "createdAt"
            },
            ProjectionExpression: '#name,#um, #ag, #ca, #rl, #id'
    }

    return execScanCommand<Pick<UserInDB, 'name' | 'id'>>(scanCommand)
}
}
