import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database.config";

export interface UserAttributes {
  id: string;
  name: string;
  age: number;
  description: string;
  image: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {};
export class UserInstance extends Model<UserAttributes, UserInput> {};

UserInstance.init(
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