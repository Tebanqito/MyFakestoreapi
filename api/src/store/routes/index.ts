import { Router } from 'express';
import productRouter from './ProductRouter';
import userRouter from './UserRouter';

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;