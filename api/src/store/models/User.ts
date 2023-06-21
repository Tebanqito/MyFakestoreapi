import db from "../../config/database.config";
import { Product } from "./Product";
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
} from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
  age: number;
  image: string;
};

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare password: string;
  declare email: string;
  declare age: number | null;
  declare image: string | null;

  declare getProducts: HasManyGetAssociationsMixin<Product>;
  declare addProduct: HasManyAddAssociationMixin<Product, number>;
  declare addProducts: HasManyAddAssociationsMixin<Product, number>;
  declare setProducts: HasManySetAssociationsMixin<Product, number>;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, number>;
  declare removeProducts: HasManyRemoveAssociationsMixin<Product, number>;
  declare hasProduct: HasManyHasAssociationMixin<Product, number>;
  declare hasProducts: HasManyHasAssociationsMixin<Product, number>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare createProduct: HasManyCreateAssociationMixin<Product, "id">;

  declare products?: NonAttribute<Product[]>;

  declare static associations: {
    projects: Association<User, Product>;
  };
};

export type UserCreationAttributes = Omit<User, "id">;

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);