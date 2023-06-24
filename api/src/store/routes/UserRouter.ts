import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  linkProduct,
  unlinkProduct,
  getOwnProducts,
} from "../controllers/UserController";
import { User, UserNoPassword } from "../models/user.model";
import { Product } from "../models/product.model";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users: User[] = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "error al obtener todos los usuarios.", route: "/" });
  }
});

userRouter.get("/productsByUser/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const products: Product[] = await getOwnProducts(id);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({
        error: "error al obtener todos los productos de usuario.",
        route: "/productByUser/:id",
      });
  }
});

userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    if (!id) throw new Error("El id del paciente no esta indefinido.");

    const user: UserNoPassword = await getUserById(id);
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
    const user: User = await createUser(userToCreate);
    if (!user) throw new Error();

    res
      .status(200)
      .json({ success: `Usuario ${user.dataValues.id} creado con exito.` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al crear un producto.", route: "/" });
  }
});

userRouter.put("/linkProduct/:id", async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const productId: string = req.params.id;

  try {
    const user: UserNoPassword = await linkProduct(userId, productId);
    if (!user) throw new Error();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "error al comprar un producto.", route: "/" });
  }
});

userRouter.put("/unlinkProduct/:id", async (req: Request, res: Response) => {
  const userId: string = req.body.userId;
  const productId: string = req.params.id;

  try {
    const user: UserNoPassword = await unlinkProduct(userId, productId);
    if (!user) throw new Error();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "error al comprar un producto.", route: "/" });
  }
});

userRouter.put("/update/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const attributes = req.body;

  try {
    const user = await updateUserById(id, attributes);
    if (!user)
      throw new Error(`El usuario con el id ${id} no se encuentra en la BDD.`);

    res.status(200).json({ update: `Usuario ${user.email} actualizado.` });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "error al actualizar un usuario.",
      route: "/update/:id",
    });
  }
});

userRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;

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