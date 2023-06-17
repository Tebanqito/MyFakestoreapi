// import { v4 as uuidv4 } from "uuid";
import { UserInput, User } from "../models/User";
import { Product } from "../models/Product";

export const createUser = async (user: UserInput): Promise<User> => {
  // const id = uuidv4();
  // const createdUser = await User.create({ ...user, id });
  const createdUser = await User.create(user);
  return createdUser;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await User.findAll({ attributes: ["id", "email", "name", "image"] });
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

export const getUserById = async (id: number): Promise<User | null> => {
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "description", "image", "age"],
    include: [{ model: Product, attributes: ["title", "price", "category"] }],
  });
  return user;
};

export const updateUserById = async (
  id: number,
  attibutes: Partial<UserInput>
): Promise<User | null> => {
  await User.update(attibutes, { where: { id: id } });
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "image"],
  });
  return user;
};

export const deleteUserById = async (id: number): Promise<User | null> => {
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