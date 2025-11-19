import mysql from 'mysql2/promise'
import process from 'node:process'

const usePool = mysql.createPool({
    host: process.env.SQL_URL,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: 'liconapp'
})


export {usePool} 
