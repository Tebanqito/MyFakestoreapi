// import { v4 as uuidv4 } from "uuid";
import { ProductInput, Product } from "../models/Product";

export const createProduct = async (
  product: ProductInput
): Promise<Product> => {
  // const id = uuidv4();
  // const createdProduct = await Product.create({ ...product, id });
  const createdProduct = await Product.create(product);
  return createdProduct;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await Product.findAll();
  return products;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const product = await Product.findByPk(id, {
    attributes: ["id", "price", "title", "image", "category", "description"],
  });
  return product;
};

export const updateProductById = async (
  id: number,
  attributes: Partial<ProductInput>
): Promise<Product | null> => {
  await Product.update(attributes, { where: { id } });
  const updatedProduct = await Product.findByPk(id, {
    attributes: ["id", "title", "image", "price", "category", "description"],
  });
  return updatedProduct;
};

export const deleteProductById = async (
  id: number
): Promise<Product | null> => {
  const productToDelete = await Product.findByPk(id, {
    attributes: ["id", "title", "image"],
  });
  await Product.destroy({ where: { id } });
  return productToDelete;
};