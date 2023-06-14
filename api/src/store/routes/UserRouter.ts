import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/UserController";

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
    if (!user)
      throw new Error(`El usuario con el id ${id} no se encuentra en la BDD.`);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "error al obtener todos los usuarios.",
      route: "/users/:id",
    });
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  const userToCreate = req.body;

  try {
    const user = await createUser(userToCreate);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al crear un producto.", route: "/" });
  }
});

userRouter.put("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const attributes = req.body;

  try {
    const user = await updateUserById(id, attributes);
    if (!user)
      throw new Error(`El usuario con el id ${id} no se encuentra en la BDD.`);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "error al actualizar un usuario.",
      route: "/update/:id",
    });
  }
});

userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await deleteUserById(id);
    if (!user)
      throw new Error(`El usuario con el id ${id} no se encuentra en la BDD.`);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "error al eliminar un usuario.", route: "/delete/:id" });
  }
});

export default userRouter;
