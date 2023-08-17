import express from "express";
import loginAndRegisterAndUserInfo from "./routes/login&register&userinfo";
import addCrypto from "./routes/cryptoMutations";
import getAccessTokenOnExpiration from "./routes/getAccessTokenOnExpiration";
import addFollows from "./routes/socialRoute";
import { AppDataSource } from "./data-source";
import cookieParser from "cookie-parser";
import { mainErrorHandlerMiddleware } from "./middleware/mainErrorHandlerMiddleware";
import cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) =>
    console.error("Error during Data Source initialization", error)
  );

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(cookieParser());

app.use("/api/user", loginAndRegisterAndUserInfo);
app.use("/api/crypto", addCrypto);
app.use("/api/follows", addFollows);
app.use("/refresh", getAccessTokenOnExpiration);
app.use(mainErrorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
