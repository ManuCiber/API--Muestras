import morgan from "morgan";
import { envs } from "./config/envs";
import app from "./app"
const PORT = envs.PORT;
app.use(morgan("dev"));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
