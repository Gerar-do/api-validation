import mysql from 'mysql2/promise';
import { config } from '../../../config'

const mysqlConfig = {

    host: config.server.mysql_host, 
    user: config.server.mysql_user, 
    password: config.server.mysql_password,
    database: config.server.mysql_database,  
};

export const query = async (sql: string, params: any[]) => {
    console.log('Connecting to MySQL');
    const conn = await mysql.createConnection(mysqlConfig);
    try {
    const [result] = await conn.execute(sql, params);
    return result;
    } finally {
    console.log('Closing MySQL connection');
    await conn.end();
    }
};