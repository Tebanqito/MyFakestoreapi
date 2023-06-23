import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database.config";
import { Product } from "./product.model";

export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  password: string;
  image: string;
  age: number;
  products: string[]
};

export interface UserInput extends Optional<UserAttributes, "id"> {};
export class User extends Model<UserAttributes, UserInput> {};
User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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