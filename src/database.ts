import { Sequelize } from 'sequelize';
import {
  DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_LOG,
} from './config';

const database = new Sequelize({
  dialect: 'postgres',
  logging: DB_LOG ? console.log : false,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
});

export default database;

export function openConnection() {
  return database.authenticate();
}

export function closeConnection() {
  return database.close();
}
