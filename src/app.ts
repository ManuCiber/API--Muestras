import express from "express";
import morgan from "morgan";
import cors from "cors";
import routeApp from "../src/routes/routes";
import { envs } from "../src/config/envs";
import { errorHandler } from "../src/middleware/error.middleware";


const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routeApp);

// Global Error Handler - Must be last
app.use(errorHandler);

export default app;