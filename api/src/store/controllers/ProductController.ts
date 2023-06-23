import { v4 as uuidv4 } from "uuid";
import { ProductAttributes, Product } from "../models/product.model";
import { User } from "../models/user.model";
import { getUserById } from "./UserController";

export const createProduct = async (
  product: Omit<ProductAttributes, "id">
): Promise<Product> => {
  const id = uuidv4();
  const createdProduct: Product = await Product.create({ ...product, id });
  return createdProduct;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products: Product[] = await Product.findAll();
  return products;
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const product: Product | null = await Product.findByPk(id, {
    attributes: ["id", "price", "title", "image", "category", "description"],
  });
  return product;
};

export const getProductsByIds = async (productsIds: string[]): Promise<Product[]> => {
  let products: Product[] = [];
  for (let index = 0; index < productsIds.length; index++) {
      const product: Product = await getProductById(productsIds[index]) as Product;
      products.push(product);
  }
  return products;
};

export const getProductByIds = async (productsIds: string[], productId: string): Promise<Product | null> => {
  for (let index = 0; index < productsIds.length; index++) {
      if (productsIds[index] === productId) {
        const product: Product | null = await getProductById(productId);
        return product;
      }
  }
  return null;
};

export const updateProductById = async (
  id: string,
  attributes: Partial<Omit<ProductAttributes, "id">>
): Promise<Product | null> => {
  await Product.update(attributes, { where: { id } });
  const updatedProduct: Product | null = await getProductById(id);
  return updatedProduct;
};

export const deleteProductById = async (
  id: string
): Promise<Product | null> => {
  const productToDelete: Product | null = await Product.findByPk(id, {
    attributes: ["id", "title", "image"],
  });
  await Product.destroy({ where: { id } });
  return productToDelete;
};

export const getOwnUser = async (productId: string): Promise<User | null> => {
  const product: Product | null = await getProductById(productId);
  const user: User | null = await getUserById(product?.dataValues.userId as string);
  return user;
};