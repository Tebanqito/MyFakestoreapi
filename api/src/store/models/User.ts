import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database.config";

import { Product } from "./Product";

export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
  age?: number;
  description?: string;
  image?: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export class User extends Model<UserAttributes, UserInput> {}

User.init(
  {
    id: {
      // type: DataTypes.UUIDV4,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);