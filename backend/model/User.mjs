import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  cart: {
    type: ["String"],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export { User };
