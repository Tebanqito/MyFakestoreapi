import { Sequelize } from "sequelize-typescript";

const DB_USER: string = process.env.DB_USER;
const DB_PASSWORD: string = process.env.DB_PASSWORD;
const DB_HOST: string = process.env.DB_HOST;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/fackestoreapi`, {
  logging: false,
  native: false,
});

export default db;