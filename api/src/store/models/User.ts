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
  declare addProduct: HasManyAddAssociationMixin<Product, string>;
  declare addProducts: HasManyAddAssociationsMixin<Product, string>;
  declare setProducts: HasManySetAssociationsMixin<Product, string>;
  declare removeProduct: HasManyRemoveAssociationMixin<Product, string>;
  declare removeProducts: HasManyRemoveAssociationsMixin<Product, string>;
  declare hasProduct: HasManyHasAssociationMixin<Product, string>;
  declare hasProducts: HasManyHasAssociationsMixin<Product, string>;
  declare countProducts: HasManyCountAssociationsMixin;
  declare createProduct: HasManyCreateAssociationMixin<Product, "id">;

  declare products?: NonAttribute<Product[]>;

  declare static associations: {
    projects: Association<User, Product>;
  };
};

export interface UserAttributes {
  id: number;
  name: string;
  password: string;
  email: string;
  age: number | null;
  image: string | null;
};

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