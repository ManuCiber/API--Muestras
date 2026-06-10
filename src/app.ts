import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/routes";
import { errorHandler } from "../src/middleware/error.middleware";
import { envs } from "./config/envs";


const app = express();
const PORT = envs.PORT;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", router);

// Global Error Handler - Must be last
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;