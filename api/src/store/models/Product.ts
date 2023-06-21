import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import db from "../../config/database.config";
import { User } from "./User";

type Category =
  | "electronic"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

interface ProductAttributes {
  id: number;
  title: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare category: Category;
  declare description: string;
  declare price: number;
  declare image: string;

  declare userId: ForeignKey<User["id"] | null>;
};

export type ProductCreationAttributes = Omit<Product, "id">;

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "Product",
  }
);