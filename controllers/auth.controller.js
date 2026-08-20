import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerController = async (req, res) => {
  try {
    //destructinng the body
    const { name, email, password } = req.body;
    // generic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: "false",
        message: "Please fill all the required fields",
      });
    }
    //password length validation
    if (password.length < 6) {
      return res.status(400).json({
        success: "false",
        message: "Password must be least 6 characters long",
      });
    }
    //check if user already exists

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    //if does, return error
    if (existingUser) {
      return res.status(400).json({
        success: "false",
        message: "user already exists with the provided email",
      });
    }
    //lets hash the password now
    const hashedPassword = await bcrypt.hash(password, 10);

    //now with the hashed password lets create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //generate token and send it with the response
    const token = generateToken(user._id);

    //return success response now,
    res.status(201).json({
      success: "true",
      message: "Registration Successfull",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    console.log("error while registering the user", error.message);
    next(error);
  }
};

export const loginController = async (req, res) => {
  res.status(200).json({ message: "Login Route" });
};

export const meController = async (req, res) => {
  res.status(200).json({ message: "Me Route" });
};
