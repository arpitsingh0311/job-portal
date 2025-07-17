import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cloudinary from "../utils/cloud.js";
import getDataUri from "../utils/datauri.js";
dotenv.config();

export const register = async (req, res, next) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const file = req.file;
    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    //  convert password to hashes
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      }
    });
    await newUser.save();

    res.status(200).json({
      message: `Account created successfuly ${fullname}`,
      newUser,
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error registration failed",
      success: false,
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).json({
        message: "Missing required fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // generate token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

    return res.status(200).cookie("token", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    }).json({
      message: `Welcone back ${user.fullname}`,
      user,
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error login failed",
      success: false,
    });
  }
};

export const logout = async (req, res, next) => {
  try {
    return res.status(200).cookie(
      "token",
      "",
      { maxAge: 0 }
    ).json({
      message: `Logged out successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error logout failed",
      success: false,
    });
  }
};

export const updateProfile = async (req,res,next) =>{
  try{
    const {fullname,email,phoneNumber,bio,skills} = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
      });
    }    

    // cloudinary upload
    const fileUri = getDataUri(file);
    const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if(skills){
      skillsArray = skills.split(',');
    }
    const userId = req.id; //middleware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if(fullname){
      user.fullname = fullname;
    }
    if(email){
      user.email= email;
    }
    if(phoneNumber){
      user.phoneNumber = phoneNumber;
    }
    if(bio){
      user.profile.bio = bio;
    }
    if(skills){
      user.profile.skills = skillsArray;
    }
  
    // resume
    if(cloudinaryResponse){
      user.profile.resume = cloudinaryResponse.secure_url;
      user.profile.resumeOriginalname = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    res.status(200).json({
      message: `Profile Updated successfuly`,
      user,
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error logout failed",
      success: false,
    });
  }
};