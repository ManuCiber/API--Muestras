import app from "@server/server";
import { envs } from "@config/envs";
import router from "@routes/routes";


app.use("/api", router);

app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
});

export default app;