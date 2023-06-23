import { v4 as uuidv4 } from "uuid";
import { User, UserAttributes } from "../models/user.model";
import { Product } from "../models/product.model";
import { getProductById, getProductsByIds } from "./ProductController";

export const createUser = async (
  user: Omit<UserAttributes, "id">
): Promise<User> => {
  const id = uuidv4();
  const createdUser: User = await User.create({ ...user, id });
  return createdUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users: User[] = await User.findAll({
    attributes: ["id", "email", "name", "image"],
  });
  return users;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user: User | null = await User.findOne({
    where: { email: email },
    attributes: ["id", "email", "name", "image"],
  });
  return user;
};

export const getUserByName = async (name: string): Promise<User | null> => {
  const user: User | null = await User.findOne({
    where: { name: name },
    attributes: ["id", "email", "name", "image"],
  });
  return user;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user: User | null = await User.findByPk(id, {
    attributes: ["id", "name", "email", "description", "image", "age"],
    include: [{ model: Product, attributes: ["title", "price", "category"] }],
  });
  return user;
};

export const updateUserById = async (
  id: string,
  attibutes: Partial<Omit<UserAttributes, "id">>
): Promise<User | null> => {
  await User.update(attibutes, { where: { id: id } });
  const user: User | null = await getUserById(id);
  return user;
};

export const deleteUserById = async (id: string): Promise<User | null> => {
  const user: User | null = await getUserById(id);
  await User.destroy({ where: { id: id } });
  return user;
};

export const emailValidator = (email: string): boolean => {
  const patronEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return patronEmail.test(email);
};

export const linkProduct = async (
  userId: string,
  productId: string
): Promise<User | null> => {
  const user: User | null = await getUserById(userId);
  user?.dataValues.products.push(productId);
  await updateUserById(userId, { products: user?.dataValues.products });
  return user;
};

export const unlinkProduct = async (
  userId: string,
  productId: string
): Promise<Product | null> => {
  const user: User | null = await getUserById(userId);
  const newProducts: string[] = user?.dataValues.products.filter(
    (p) => p !== productId
  ) as string[];
  await updateUserById(userId, { products: newProducts });
  const product: Product | null = await getProductById(productId);
  return product;
};

export const getOwnProducts = async (userId: string): Promise<Product[]> => {
  const user: User | null = await getUserById(userId);
  const productsIds: string[] = user?.dataValues.products as string[];
  const products: Product[] = await getProductsByIds(productsIds);
  return products;
};