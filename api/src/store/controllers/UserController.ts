import { v4 as uuidv4 } from "uuid";
import { User, UserAttributes, UserNoPassword } from "../models/user.model";
import { getProductById, getProductsByIds } from "./ProductController";
import { Product } from "../models/product.model";

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

export const getUserById = async (id: string): Promise<UserNoPassword> => {
  let user: UserNoPassword = {};
  await User.findByPk(id).then((data) => data?.dataValues).then((data) => {
    user = {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      products: data?.products,
      image: data?.image,
    } as UserNoPassword;
  });
  return user;
};

export const getUserByIdWhitPasswword = async (id: string): Promise<UserAttributes> => {
  let user: UserAttributes = { id: "", name: "", email: "", password: "", image: "", age: 0, products: [] };
  await User.findByPk(id).then((data) => data?.dataValues).then((data) => {
    user = {
      id: data?.id,
      name: data?.name,
      email: data?.email,
      products: data?.products,
      age: data?.age,
      image: data?.image,
      password: data?.password,
    } as UserAttributes;
  });
  return user;
};

export const updateUserById = async (
  id: string,
  attibutes: Partial<Omit<UserAttributes, "id">>
): Promise<UserAttributes> => {
  await User.update(attibutes, { where: { id: id } });
  const user: UserAttributes = await getUserByIdWhitPasswword(id);
  return user;
};

export const deleteUserById = async (id: string): Promise<UserNoPassword> => {
  const user: UserNoPassword = await getUserById(id);
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
): Promise<UserNoPassword> => {
  const user: UserNoPassword = await getUserById(userId);
  await User.update({ products: [...user.products as string[], productId] }, { where: { id: userId } });
  const userUpdated: UserNoPassword = await getUserById(userId);
  return userUpdated;
};

export const unlinkProduct = async (
  userId: string,
  productId: string
): Promise<Product | null> => {
  const user: UserNoPassword = await getUserById(userId);
  const newProducts: string[] | undefined = user.products?.filter((p) => p !== productId);
  await updateUserById(userId, { products: newProducts });
  const product: Product | null = await getProductById(productId);
  return product;
};

export const getOwnProducts = async (userId: string): Promise<Product[]> => {
  const user: UserNoPassword = await getUserById(userId);
  const productsIds: string[] = user.products as string[];
  const products: Product[] = await getProductsByIds(productsIds);
  return products;
};
