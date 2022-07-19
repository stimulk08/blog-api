import { Sequelize } from 'sequelize';

import {
  DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD,
} from './config';

export default new Sequelize({
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
});
