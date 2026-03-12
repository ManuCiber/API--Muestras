import express from "express";
import morgan from "morgan";
import { envs } from "@config/envs";
import router from "./routes/routes";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "*"
}))
app.use(morgan('dev'))
app.use(express.json());

app.use("/api", router);

app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
});

export default app;