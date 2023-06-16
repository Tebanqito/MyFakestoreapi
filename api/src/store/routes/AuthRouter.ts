import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import {
  createUser,
  getUserByEmail,
  getUserByName,
  emailValidator,
} from "../controllers/UserController";

const authRouter = express.Router();

authRouter.post("/userRegister", async (req: Request, res: Response) => {
  const { name, password, email, description, image, age } = req.body;

  try {
    const userByEmail = await getUserByEmail(email);
    if (userByEmail)
      throw new Error(`Ya existe un usuario con el email ${email}.`);

    const userByName = await getUserByName(name);
    if (userByName)
      throw new Error(`Ya existe un usuario con el nombre ${name}.`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      password: hashedPassword,
      email,
      description,
      image,
      age,
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al registrar el usuario." });
  }
});

authRouter.post("/userLogin", async (req: Request, res: Response) => {
  const password: string = req.body.password;
  const userName: string = req.body.userName;

  try {
    let user: User | null;

    if (emailValidator(userName)) {
      user = await getUserByEmail(userName);
    } else {
      user = await getUserByName(userName);
    }

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña invalida." });
    }

    res.status(200).json({ message: "Login exitoso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Fallo al logear." });
  }
});

export default authRouter;
