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
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: "false", message: "Email and password are required" });

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password" });

    if (!user.isActive) {
      return res
        .status(403)
        .json({ success: false, message: "Your account has been disabled" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: "false", message: "Invalid password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: "true",
      message: "Login Successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      token,
    });
  } catch (error) {
    console.log("Error while logging in the user", error.message);
  }
};

export const meController = async (req, res) => {
  try {
    return res.status(201).json({
      success: "true",
      data: {
        user: req.user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: "false",
      message: "Something went wrong",
    });
  }
};
