import { User } from "./model/User.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import http from "https";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

// Creating cookie data using jwt
// This is made global so it can be accessible to both signup and login modules
const expirationDuration = 7 * 24 * 60 * 60;
const createJWTtoken = (id) => {
  return jwt.sign({ id }, "my secret code goes here", {
    expiresIn: expirationDuration,
  });
};

const signup_post = (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email })
    .then(async (result) => {
      if (result) {
        res.json({ failed: "Email already exists" });
      } else {
        // Encrypt password before saving to DB

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        bcrypt
          .hash(password, 10)
          .then((hash) => {
            const newUser = new User({
              name: name,
              email: email,
              password: hash,
            });

            newUser
              .save()
              .then((user) => {
                const token = createJWTtoken(user.email);
                res.cookie("jwt", token, {
                  httpOnly: true,
                  maxAge: expirationDuration * 1000,
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
        res.json({ success: user });
        return;
      } else {
        res.json({ failed: "Incorrect email or password" });
      }
    })
    .catch((err) => res.json({ err: err }));
};

const verify_user = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    let decoded = {};
    jwt.verify(token, "my secret code goes here", (err, decodedToken) => {
      if (err) {
        res.json({ failed: "Some error occured..." });
        return { failed: "Some error occured..." };
      } else if (decodedToken) {
        res.json({ success: "Authorized" });
        decoded = decodedToken;
        return decoded;
      }
    });

    return decoded;
  } else {
    res.json({ failed: "Unauthorized access..." });
    return { failed: "Unauthorized access..." };
  }
};

const verifyUserIdentity = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    let decoded = {};
    jwt.verify(token, "my secret code goes here", (err, decodedToken) => {
      if (err) {
        return { failed: "Unauthorized Access" };
      } else if (decodedToken) {
        decoded = decodedToken;
        // return decoded;
      }
    });

    return decoded;
  } else {
    return { unauthorized: "You are not authorized to view this resource" };
  }
};

const add_to_cart = async (req, res) => {
  const word = req.body.text;
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.err) {
    res.json(verified);
    return;
  }
  const userID = verified.id;

  // Ensure the to-be-added word isn't already in the cart array
  // for that particular user before adding.
  const cartItems = await User.find(
    { email: userID },
    { cart: 1 } //Returns only the cart field and not the entire user document
  );
  if (cartItems[0].cart.indexOf(word) === -1) {
    await User.updateOne({ email: userID }, { $push: { cart: word } });
    res.json({ success: "Added to Cart successfully" });
    return;
  } else {
    res.json({ failed: "Word already added to Cart" });
    return;
  }
};

const viewCart = async (req, res) => {
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.unauthorized) {
    res.json(verified);
    return;
  }
  const userID = verified.id;

  // Ensure the to-be-added word isn't already in the cart array
  // for that particular user before adding.
  let cartItems = await User.find(
    { email: userID },
    { cart: 1 } //Returns only the cart field and not the entire user document
  );

  cartItems = cartItems[0].cart;
  res.json(cartItems);
  return;
};

const deleteFromCart = async (req, res) => {
  const word = req.body.word;
  const verified = verifyUserIdentity(req, res);
  if (verified.failed || verified.err) {
    return { failed: verified };
  }
  const userID = verified.id;
  await User.updateOne({ email: userID }, { $pull: { cart: word } }); // Remove word from array
  let cartItems = await User.find(
    { email: userID },
    { cart: 1 } //Returns only the cart field and not the entire user document
  );

  cartItems = cartItems[0].cart;

  res.json(cartItems);
};

const logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.json({ success: "Logout successfull" });
};

export {
  signup_post,
  login_post,
  verify_user,
  add_to_cart,
  viewCart,
  deleteFromCart,
  logout,
};
