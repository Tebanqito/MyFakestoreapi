import { Router } from "express";
import productRouter from "./ProductRouter";
import userRouter from "./UserRouter";
import authRouter from "./AuthRouter";

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
