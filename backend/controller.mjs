import { User } from "./model/User.mjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// Creating cookie data using jwt
// This is made global so it can be accessible to both signup and login modules
const expirationDuration = 7 * 24 * 60 * 60;
const createJWTtoken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, {
    expiresIn: expirationDuration,
  });
};

const verify_user = (req, res) => {
  const token = req.cookies.jwt;
  console.log("token", token);
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        return res.json({ failed: "Some error occured..." });
      } else if (decodedToken) {
        return res.json({ success: "Authorized" });
      }
    });
  } else {
    return res.json({ failed: "Unauthorized access..." });
  }
};

const signup_post = (req, res) => {
  const [
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    paymentOption,
    cardHolderName,
    cvv,
    cardNumber,
    expirationDate,
  ] = req.body.fields; // Destructure the fields to identify each data item
  const file = req.files.file;

  User.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res.json({ failed: "Email already exists" });
      } else {
        // Check if the type is not listed in the validTypes array
        const fileExt = file.mimetype.split("/").pop();
        const validTypes = ["jpg", "jpeg", "png", "gif", "svg"];
        if (validTypes.indexOf(fileExt) === -1) {
          throw Error("Wrong file type selected");
        }

        const profilePhoto =
          "./uploads/" + firstName + phoneNumber + "." + fileExt; // Store file path as field in MongoDB
        // fs.rename(file.tempFilePath, profilePhoto, async (err) => {
        //   if (err) console.log(err);
        // });
        // Encrypt password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const cardNumberHash = await bcrypt.hash(cardNumber, salt);
        const cvvHash = await bcrypt.hash(cvv, salt);
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            const newUser = new User({
              firstName,
              lastName,
              email,
              password: hash,
              phoneNumber,
              paymentOption,
              cardHolderName,
              cvv: cvvHash,
              cardNumber: cardNumberHash,
              profilePhoto,
              expirationDate,
            });

            newUser
              .save()
              .then((user) => {
                const token = createJWTtoken(user.email);
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: expirationDuration * 1000,
                  secure: process.env.NODE_ENV === "production",
                });
                res.json({ success: user });
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(async (user) => {
      if (!user) {
        res.json({ failed: "Incorrect email or password" });
        return;
      }
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = createJWTtoken(user.email);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: expirationDuration * 1000,
        });
        console.log("Cookie sent");
        res.json({ success: user });
        return;
      } else {
        res.json({ failed: "Incorrect email or password" });
      }
    })
    .catch((err) => res.json({ err: err }));
};

const logout = (req, res) => {
  console.log("Logged out");
  res.cookie("jwt", "", { maxAge: 1 }); // Set cookie to empty string and reduce max age to one mili second
  res.json({ success: "Logout successfull" });
};

export { signup_post, login_post, verify_user, logout };
