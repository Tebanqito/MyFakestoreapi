import { DataTypes, Model, Optional } from "sequelize";
import db from "../../config/database.config";

type CategoryProduct =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface ProductAttributes {
  id: string;
  title: string;
  price: number;
  category: CategoryProduct;
  description: string;
  image: string;
}

export interface ProductInput extends Optional<ProductAttributes, "id"> {};
export class Product extends Model<ProductAttributes, ProductInput> {};

Product.init(
  {
    id: {
      // type: DataTypes.UUIDV4,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        "electronics",
        "jewelery",
        "men's clothing",
        "women's clothing"
      ),
      allowNull: false,
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
    tableName: "products",
    timestamps: false,
  }
);