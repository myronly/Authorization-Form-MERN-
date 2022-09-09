import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const isUsed = await User.findOne({ login });

    if (isUsed) {
      return res.json({
        message: "The login is used.",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      login,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: "Successfully.",
    });
  } catch (error) {
    res.json({
      message: "Error",
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });

    if (!user) {
      return res.json({
        message: "The login does not exist.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({
        message: "The password is not correct.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      token,
      user,
      message: "Successfully",
    });
  } catch (error) {
    res.json({
      message: "Error",
    });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "The login does not exist.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      user,
      token,
    });
  } catch (error) {
    return res.json({
      message: "Not allowed.",
    });
  }
};
