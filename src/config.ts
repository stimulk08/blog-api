import { config } from 'dotenv';

config({
  path: `${__dirname}/../.env`,
});

export const PORT = Number(process.env.PORT);
export const DB_HOST = String(process.env.DB_HOST);
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_NAME = String(process.env.DB_NAME);
export const DB_USER = String(process.env.DB_USER);
export const DB_PASSWORD = String(process.env.DB_PASSWORD);
