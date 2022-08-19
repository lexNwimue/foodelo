import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import cors from "cors";
import upload from "express-fileupload";
import { signup_post, login_post, logout, verify_user } from "./controller.mjs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(upload());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//   })
// );
app.use(cookieParser());

// Connect to MongoDB

const dbURI = "mongodb://localhost/iDev_reg_and_login_task_db";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000);
    console.log("Server ready . . .");
  })
  .catch((err) => console.log(err));

app.post("/signup", signup_post);
app.post("/login", login_post);
app.get("/logout", logout);
app.get("/dashboard", verify_user);
app.all("*", (req, res) => {
  res.json({ err: "404 - Not Found" });
});
