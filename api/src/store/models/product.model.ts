import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  BelongsTo,
  DataType,
  ForeignKey,
  PrimaryKey,
  IsUUID,
} from "sequelize-typescript";
// import db from "../../config/database.config";
import { User } from "./user.model";

type Category =
  | "electronic"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface ProductAttributes {
  id: string;
  title: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

@Table
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {

  // @IsUUID(4)
  // @PrimaryKey
  id!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.FLOAT)
  price!: number;

  @Column(DataType.STRING)
  image!: string;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  category!: Category;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
};