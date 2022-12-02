import User from "../models/Signup.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import _ from "lodash";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(409)
        .json({ error: ` user with ${email} already exisits!` });
    }

    user = new User({
      firstname,
      lastname,
      email,
      password,
    });
    user = new User(
      _.pick(req.body, ["firstname", "lastname", "email", "password"])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(201).send({
      data: _.pick(user, ["_id", "name", "email"]),
      message: "user signed up successfully",
    });
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: error,
      });
    }
  }
};

export const Login = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Incorrect email or password.");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send("Incorrect email or password.");
    }

    const token = jwt.sign({ _id: user._id }, process.env.KEY, {
      expiresIn: "3h",
    });

    res.status(200).json({
      message: "user successfully logged in",
      data: _.pick(user, ["_id", "name", "email"]),
      token,
    });
  } catch (error) {
    if (error) {
      res.status(500).send({
        message: error,
      });
    }
  }
};
