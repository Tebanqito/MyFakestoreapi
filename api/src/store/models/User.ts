import { DataTypes, Model, Optional } from "sequelize";
import { Column, DataType, } from 'sequelize-typescript';
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
// export class User extends Model<UserAttributes, UserInput> {}
export class User extends Model<UserAttributes, UserInput> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
  })
  image!: string;

  @Column({
    type: DataType.NUMBER,
  })
  age!: number;
}

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

User.hasMany(Product);
User.belongsToMany(Product, { through: User });

Product.hasMany(User);
Product.belongsToMany(User, { through: Product });
