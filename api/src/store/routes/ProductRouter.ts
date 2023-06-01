import { Router, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/ProductController";
import { ProductAttributes } from "../models/Product";
import axios from "axios";

const productRouter = Router();

productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();

    if (!products.length) {
      await axios.get("https://fakestoreapi.com/products").then((res) => {
        const productsToCreate = res.data;

        productsToCreate.forEach(async (element: ProductAttributes) => {
          await createProduct({ ...element });
        });
      });

      return res.status(200).json({ status: "Productos cargados en la BDD." });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al obtener todos los productos.", route: "/" });
  }
});

productRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al obtener un producto por id.", route: "/:id" });
  }
});

productRouter.post("/", async (req: Request, res: Response) => {
  const productToCreate = req.body;

  try {
    const product = await createProduct(productToCreate);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al crear un producto.", route: "/" });
  }
});

productRouter.put("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const attributes = req.body;

  try {
    const product = await updateProductById(id, attributes);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al actualizar un producto.", route: "/update/:id" });
  }
});

productRouter.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await deleteProductById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "error al eliminar un producto.", route: "/delete/:id" });
  }
});

export default productRouter;