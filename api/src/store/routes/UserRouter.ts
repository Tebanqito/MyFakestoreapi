import { Router, Request, Response } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} from "../controllers/UserController";
import { UserAttributes } from "../models/User";
import axios from "axios";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    try {
      const users = await getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "error al obtener todos los usuarios.", route: "/" });
    }
});

export default userRouter;