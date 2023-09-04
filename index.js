const express = require("express");
const dotenv = require("dotenv");
const authRouter = require("./Routes/auth");
const postRouter = require("./Routes/post.js");
const userRouter = require("./Routes/user.js");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_DB, { dbName: "main" })
  .then(console.log("connected to db"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(
    `${process.env.PORT} is listening... http://localhost:${process.env.PORT}`
  );
});
