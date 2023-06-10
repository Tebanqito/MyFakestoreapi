import { v4 as uuidv4 } from "uuid";
import {
  UserInput,
  User,
} from "../models/User";

export const createUser = async (user: UserInput): Promise<User> => {
    const id = uuidv4();
    const createdUser = await User.create({ ...user, id });
    return createdUser;
};