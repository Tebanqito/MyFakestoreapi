import { v4 as uuidv4 } from "uuid";
import { ProductCreationAttributes, Product } from "../models/Product";
import { User } from "../models/User";
import { getUserById } from "./UserController";

export const createProduct = async (
  product: ProductCreationAttributes
): Promise<Product> => {
  const id = uuidv4();
  const createdProduct = await Product.create({ ...product, id });
  // const createdProduct = await Product.create(product);
  return createdProduct;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await Product.findAll();
  return products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const product = await Product.findByPk(id, {
    attributes: ["id", "price", "title", "image", "category", "description"],
  });
  return product;
};

export const updateProductById = async (
  id: string,
  attributes: Partial<ProductCreationAttributes>
): Promise<Product | null> => {
  await Product.update(attributes, { where: { id } });
  const updatedProduct = await Product.findByPk(id, {
    attributes: ["id", "title", "image", "price", "category", "description"],
  });
  return updatedProduct;
};

export const deleteProductById = async (
  id: string
): Promise<Product | null> => {
  const productToDelete = await Product.findByPk(id, {
    attributes: ["id", "title", "image"],
  });
  await Product.destroy({ where: { id } });
  return productToDelete;
};

export const getOwnUser = async (productId: string): Promise<User | null> => {
  const product: Product | null = await getProductById(productId);
  const user: User | null = await getUserById(String(product?.userId));
  return user;
};