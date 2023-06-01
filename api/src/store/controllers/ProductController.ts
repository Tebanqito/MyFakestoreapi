import { v4 as uuidv4 } from "uuid";
import {
  ProductInput,
  ProductInstance,
} from "../models/Product";

export const createProduct = async (
  product: ProductInput
): Promise<ProductInstance> => {
  const id = uuidv4();
  const createdProduct = await ProductInstance.create({ ...product, id });
  return createdProduct;
};

export const getAllProducts = async (): Promise<ProductInstance[]> => {
  const products = await ProductInstance.findAll();
  return products;
};

export const getProductById = async (id: string): Promise<ProductInstance> => {
  const product = await ProductInstance.findByPk(id);
  if (!product)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  return product;
};

export const updateProductById = async (
  id: string,
  attributes: Partial<ProductInput>
): Promise<ProductInstance> => {
  await ProductInstance.update(attributes, { where: { id } });
  const updatedProduct = await ProductInstance.findByPk(id);
  if (!updatedProduct)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  return updatedProduct;
};

export const deleteProductById = async (
  id: string
): Promise<ProductInstance> => {
  const productToDelete = await ProductInstance.findByPk(id);
  if (!productToDelete)
    throw new Error(
      `No se encuentra ningun producto con el id ${id} en la base de datos.`
    );
  await ProductInstance.destroy({ where: { id } });
  return productToDelete;
};