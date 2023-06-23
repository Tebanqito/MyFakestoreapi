// import db from "../../config/database.config";
import { Product } from "./product.model";
import { Optional } from "sequelize";
import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  PrimaryKey,
  IsUUID,
} from "sequelize-typescript";

export interface UserAttributes {
  id: string;
  name: string;
  password: string;
  email: string;
  age: number | null;
  image: string | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {
  // @IsUUID(4)
  // @PrimaryKey
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.INTEGER)
  age!: number | null;

  @Column(DataType.STRING)
  image!: string | null;

  @HasMany(() => Product)
  products!: Product[];
}
