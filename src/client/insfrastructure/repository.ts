import { ClientRepository } from "../domain/client-repository";
//import { MongoTutorRepository } from "./repositories/mongo-user-repository";
import { MySQLClientRepository } from "./repositories/mysql.client.repository";
import dotenv from 'dotenv';

dotenv.config();

const db_type = process.env.DB_TYPE;

export class RepositoryFactory {
static createClientRepository(): ClientRepository {
    if (db_type === 'mysql') {
    console.log("Estamos modo mysql")
    return new MySQLClientRepository();
    } else if (db_type === 'mongo') {
    console.log("Estamos modo mongo")
     // return new MongoTutorRepository();
    }
    throw new Error('Unsupported database type');
}
}