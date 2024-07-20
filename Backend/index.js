const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

app.use("/api/v1/user/", userRouter);
app.use("/post", postRouter);

mongoose
  .connect(process.env.MONGO_SERVER)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

  const errorMiddleware = (err, req, res, next) => {
    return res.status(401).json({
      success:false,
      message:err.message
    });
  }

  app.use(errorMiddleware);

app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
