import path from "path";
import express from "express";
import mongoose from "mongoose";
import cookieParser  from 'cookie-parser';
import 'dotenv/config'
const app = express();

app.use(cookieParser());

// const PORT = 3333;
const PORT = process.env.PORT;

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true,limit:"1mb" }));
app.use(express.static("public"));

import useRouter from "../router/user.router.js";

app.use("/api/auth", useRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const statusMessage = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    statusMessage,
  });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/jwt-auth")
  .then(() => {
    app.listen(PORT, () => {
      console.log("http://localhost:" + PORT);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
