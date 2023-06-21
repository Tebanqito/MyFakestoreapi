import { v4 as uuidv4 } from "uuid";
import { UserCreationAttributes, User } from "../models/User";
import { Product } from "../models/Product";
import { getProductById } from "./ProductController";

export const createUser = async (
  user: UserCreationAttributes
): Promise<User> => {
  const id = uuidv4();
  const createdUser = await User.create({ ...user, id });
  // const createdUser = await User.create(user);
  return createdUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll({
    attributes: ["id", "email", "name", "image"],
  });
  return users;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await User.findOne({
    where: { email: email },
    attributes: ["id", "email", "name", "image"],
  });
  return user;
};

export const getUserByName = async (name: string): Promise<User | null> => {
  const user = await User.findOne({
    where: { name: name },
    attributes: ["id", "email", "name", "image"],
  });
  return user;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "description", "image", "age"],
    include: [{ model: Product, attributes: ["title", "price", "category"] }],
  });
  return user;
};

export const updateUserById = async (
  id: string,
  attibutes: Partial<UserCreationAttributes>
): Promise<User | null> => {
  await User.update(attibutes, { where: { id: id } });
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "image"],
  });
  return user;
};

export const deleteUserById = async (id: string): Promise<User | null> => {
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "image"],
  });
  await User.destroy({ where: { id: id } });
  return user;
};

export const emailValidator = (email: string): boolean => {
  const patronEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return patronEmail.test(email);
};

export const linkProduct = async (userId: string, productId: string): Promise<User | null> => {
  const user: User | null = await await getUserById(userId);
  await user?.addProduct(productId);
  return user;
};

export const unlinkProduct = async (userId: string, productId: string): Promise<Product | null> => {
  const user: User | null = await getUserById(userId);
  const product: Product | null = await getProductById(productId);
  await user?.removeProduct(productId);
  return product;
};

export const getOwnProducts = async (userId: string): Promise<Product[]> => {
  const user: User | null = await getUserById(userId);
  const products: Product[] = await user?.getProducts() as Product[];
  return products; 
};

export const getOwnProductsByCategory = async (userId: string, category: string): Promise<Product[]> => {
  const user: User | null = await getUserById(userId);
  const products: Product[] = await user?.getProducts() as Product[];
  const productFilters: Product[] = products.filter((p) => p.category === category);
  return productFilters;
};