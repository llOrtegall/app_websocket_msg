import { Sequelize } from 'sequelize';

const HOST = process.env.DB_HOST!;
const PORT = process.env.DB_PORT!;
const USER = process.env.DB_USER!;
const PASS = process.env.DB_PASS!;
const NAME = process.env.DB_NAME!;
const ENV = process.env.NODE_ENV!;

const connection = new Sequelize(NAME, USER, PASS, {
  host: HOST,
  port: parseInt(PORT),
  dialect: 'mysql',
  timezone: '-05:00',
  logging: ENV === 'dev' ? true : false
})

export { connection }