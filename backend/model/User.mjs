import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
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
    phoneNumber: {
      require: true,
      type: String, // MongoDB truncates the leading zero in number types
      unique: true,
    },
    paymentOption: {
      required: true,
      type: String,
    },
    cardHolderName: {
      required: true,
      type: String,
    },
    cvv: {
      required: true,
      type: String,
    },
    cardNumber: {
      required: true,
      type: String, // Could have been number but I'd be hashing it
    },
    expirationDate: {
      required: true,
      type: String,
    },
    profilePhoto: {
      required: true,
      type: String, //For storing Path to photo directory
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
