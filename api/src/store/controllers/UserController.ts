import { v4 as uuidv4 } from "uuid";
import { UserInput, User } from "../models/User";
import { Product } from "../models/Product";

export const createUser = async (user: UserInput): Promise<User> => {
  const id = uuidv4();
  const createdUser = await User.create({ ...user, id });
  return createdUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll({ include: [{ model: Product }] });
  return users;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await User.findByPk(id, { include: [Product] });
  return user;
};

export const updateUserById = async (id: string, {...attibutes}: UserInput): Promise<User | null> => {
  await User.update(attibutes, { where: { id: id } });
  const user = await User.findByPk(id, { include: [Product] });
  return user;
};

export const deleteUserById = async (id: string): Promise<User | null> => {
  const user = await User.findByPk(id, { include: [Product] });
  await User.destroy({ where: { id: id } });
  return user;
};