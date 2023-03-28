import express, { Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/error.middleware";
import { appRoutes } from "./routes/index.routes";

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
appRoutes(app);
app.use(errorMiddleware);

export default app;
