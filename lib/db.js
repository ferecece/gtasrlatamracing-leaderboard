import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

console.log(process.env);
const sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  process.env.NEXT_PUBLIC_MYSQL_USER,
  process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: process.env.NEXT_PUBLIC_MYSQL_PORT,
    dialect: 'mysql',
    dialectModule: mysql2,
    logging: false,
  }
);

export default sequelize;