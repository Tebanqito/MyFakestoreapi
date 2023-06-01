import { Router } from 'express';
import productRouter from './ProductRouter';

const router = Router();

router.use("/products", productRouter);

export default router;