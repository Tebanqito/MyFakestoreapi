import { v4 as uuidv4 } from "uuid";
import {
  ProductInput,
  Product,
} from "../models/Product";

export const createProduct = async (
  product: ProductInput
): Promise<Product> => {
  const id = uuidv4();
  const createdProduct = await Product.create({ ...product, id });
  return createdProduct;
};

export const getAllProducts = async (): Promise<Product[]> => {
  const products = await Product.findAll();
  return products;
};

export const getProductById = async (id: string): Promise<Product> => {
  const product = await Product.findByPk(id);
  if (!product)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  return product;
};

export const updateProductById = async (
  id: string,
  attributes: Partial<ProductInput>
): Promise<Product> => {
  await Product.update(attributes, { where: { id } });
  const updatedProduct = await Product.findByPk(id);
  if (!updatedProduct)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  return updatedProduct;
};

export const deleteProductById = async (
  id: string
): Promise<Product> => {
  const productToDelete = await Product.findByPk(id);
  if (!productToDelete)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  await Product.destroy({ where: { id } });
  return productToDelete;
};