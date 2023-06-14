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
    res
      .status(400)
      .json({ error: "error al obtener todos los usuarios.", route: "/" });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) throw new Error("El id del paciente no esta indefinido.");

    const user = await getUserById(id);
    if (!user) throw new Error(`El usuario con el id ${id} no se encuentra en la BDD.`);
    
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        error: "error al obtener todos los usuarios.",
        route: "/users/:id",
      });
  }
});

export default userRouter;
