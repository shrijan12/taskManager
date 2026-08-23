import bcrypt from "bcryptjs";
import User from "./../models/User.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(201).json({
      success: true,
      message: `User found with name ${user.name}`,
      data: {
        user,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while getting profile" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await User.findById(req.user._id);
    if (!user)
      return res
        .statua(404)
        .json({ success: false, message: "User not found" });

    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser)
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      user.email = email;
    }
    if (name) {
      user.name = name;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error while updating profile" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    //check the length of the received password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password should be least 8 characters",
      });
    }

    // find the user based on Id, and select the password
    const user = await User.findById(req.user._id).select("+password");

    //validated if user existed
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // check as if the password matches
    const passwordMatches = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    //validate if password matches
    if (!passwordMatches) {
      return res
        .status(400)
        .json({ success: false, message: "Password doesn't matches" });
    }

    //hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    //updated the password
    user.password = hashedPassword;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while changing password",
    });
  }
};
