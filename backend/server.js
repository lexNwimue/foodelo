import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {
  signup_post,
  login_post,
  verify_user,
  add_to_cart,
  viewCart,
  deleteFromCart,
  logout,
} from "./controller.mjs";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB

const dbURI = "mongodb://localhost/foodeloDB";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(4000);
    console.log("Server ready . . .");
  })
  .catch((err) => console.log(err));

app.post("/signup", signup_post);
app.post("/login", login_post);
app.get("/dashboard", verify_user);
app.post("/cart", add_to_cart);
app.get("/cart", viewCart);
app.delete("/cart", deleteFromCart);
app.get("/logout", logout);
app.all("*", (req, res) => {
  res.json({ err: "Invalid URL" });
});
