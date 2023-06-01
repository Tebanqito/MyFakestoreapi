import express from "express";
import storeRouter from "./store/routes/index";

const app = express();

app.use(express.json());

app.use("/api", storeRouter);

export default app;