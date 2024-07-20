const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const app = express();
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
dotenv.config();
app.use(express.json());

app.use("/api/v1/user/", userRouter);
app.use("/post", postRouter);

// mongoose
//   .connect(process.env.MONGO_SERVER)
//   .then(() => {
//     console.log("Database connected");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
dbConnection()
.then(()=>{
  console.log("database connected")
  app.listen(10000, () => {
    console.log("Server is running on port 10000");
  });
}).catch((e)=>{
  console.log(e);
})
  const errorMiddleware = (err, req, res, next) => {
    return res.status(401).json({
      success:false,
      message:err.message
    });
  }

  app.use(errorMiddleware);


