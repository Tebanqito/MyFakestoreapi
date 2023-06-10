import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database.config";

import { Product } from "./Product";

export interface UserAttributes {
  id: string;
  name: string;
  age: number;
  description: string;
  image: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {};
export class User extends Model<UserAttributes, UserInput> {};

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
  }
);

User.belongsToMany(Product, { through: User });
Product.belongsToMany(User, { through: Product });