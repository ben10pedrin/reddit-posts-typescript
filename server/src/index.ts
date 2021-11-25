import express from "express";
import mongoose from "mongoose";
import { users } from "./routes/users";
import { register } from "./routes/register";
import { login } from "./routes/login";

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/test", {
    serverSelectionTimeoutMS: 2000,
  });

  const app = express();
  const port = 4000 || process.env.PORT;
  app.use(express.json());

  app.get("/users", users);
  app.post("/register", register);
  app.post("/login", login);

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};

main();
