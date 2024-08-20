// db.ts
import 'dotenv/config';
import { Sequelize } from 'sequelize';
import DeviceFactory from './models/Device';
import CommentFactory from './models/Comentario';

const { 
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST, 
  DB_PORT, 
  DB_NAME 
} = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME) {
  throw new Error('Missing environment variables for database connection');
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  username: DB_USER,
  password: DB_PASSWORD, 
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  database: DB_NAME,
  logging: false,
  native: false,
  dialectOptions: {}
});

const Device = DeviceFactory(sequelize);
const Comment = CommentFactory(sequelize);

export { Device, Comment };
export default sequelize;
