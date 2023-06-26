import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  linkProduct,
  unlinkProduct,
  getOwnProducts,
  getUserByEmail,
  getUserByName,
  emailValidator,
} from "../controllers/UserController";
import { User, UserNoPassword, UserAttributes } from "../models/user.model";
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
    res.status(400).json({
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

userRouter.post("/userLogin", async (req: Request, res: Response) => {
  const password: string = req.body.password;
  const userName: string = req.body.userName;

  try {
    let user: Partial<UserAttributes> | null;

    if (emailValidator(userName)) {
      user = await getUserByEmail(userName);
    } else {
      user = await getUserByName(userName);
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const isPasswordValid: boolean = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!isPasswordValid) {
      return res.status(400).json({ login: false });
    }

    const userToLogin: UserNoPassword = await getUserById(user.id as string);

    res.status(200).json(userToLogin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al logear." });
  }
});

userRouter.post("/userRegister", async (req: Request, res: Response) => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const image: string | null = req.body.image;
  const age: number | null = req.body.age;
  const password: string = req.body.password;
  try {
    const userByEmail: Partial<UserAttributes> | null = await getUserByEmail(
      email
    );
    if (userByEmail)
      throw new Error(`Ya existe un usuario con el email ${email}.`);

    const userByName: Partial<UserAttributes> | null = await getUserByName(
      name
    );
    if (userByName)
      throw new Error(`Ya existe un usuario con el nombre ${name}.`);

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const userToCreate: Omit<UserAttributes, "id"> = {
      name,
      password: hashedPassword,
      email,
      image,
      age,
      products: [],
    };
    const user: User = await createUser(userToCreate);
    if (!user) return res.status(400).json(false);

    res.status(200).json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al registrar el usuario." });
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
      .json({ error: "error al remover un producto.", route: "/" });
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