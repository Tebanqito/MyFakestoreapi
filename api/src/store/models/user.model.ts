import { DataTypes, Model, Optional } from "sequelize";
import db from "../../../config/database.config";

export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
  image: string | null;
  age: number | null;
  products: string[]
};
export type UserNoPassword = Partial<Omit<UserAttributes, "password">>;
export interface UserInput extends Optional<UserAttributes, "id"> {};

export class User extends Model<UserAttributes, UserInput> {};
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);
