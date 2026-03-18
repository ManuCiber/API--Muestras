import morgan from "morgan";
import app from "./app";
import { envs } from "@config/envs";

const PORT = envs.PORT;
app.use(morgan("dev"));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
