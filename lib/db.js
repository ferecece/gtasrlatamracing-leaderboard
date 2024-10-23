import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.NEXT_PUBLIC_MYSQL_DATABASE,
  process.env.NEXT_PUBLIC_MYSQL_USER,
  process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
  {
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: process.env.NEXT_PUBLIC_MYSQL_PORT,
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;