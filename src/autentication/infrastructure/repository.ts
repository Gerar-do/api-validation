import { AuthRepository } from "../domain/auth-repository";
//import { MongoAuthRepository } from "./repositories/mongo-auth-repository";
import { MySQLAuthRepository } from "./repositories/mysql-auth-repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
static createAuthRepository(): AuthRepository {
    if (db_type === 'mysql') {
    console.log("Estamos modo mysql")
    return new MySQLAuthRepository();
    } else if (db_type === 'mongo') {
    console.log("Estamos modo mongo")
     // return new MongoAuthRepository();
    }
    throw new Error('Unsupported database type');
}
}
