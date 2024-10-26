import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/user";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();
const JWT_SECRET = process?.env?.JWT_SECRET ?? "";

// function to generate jwt token
export async function signin(request: Request, response: Response) {
  const { email, password } = request.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordMatched = await user.authenticate(password);

      if (isPasswordMatched) {
        const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET, {
          expiresIn: "3d",
        });
        response.status(200).json({
          message: "User is signed in successfully",
          body: { token, user },
        });
      } else {
        throw "password is incorrect";
      }
    } else {
      throw "User not found";
    }
  } catch (error) {
    response.status(400).json({ message: "Error in signed in", body: error });
  }
}

// function to sign up a user
export async function signup(request: Request, response: Response) {
  const {
    employeeName,
    gender,
    designation,
    contactNumber,
    role,
    email,
    password,
  } = request.body;

  try {
    const alreadyAUser = await User.findOne({ email });

    if (alreadyAUser) {
      throw "User is already present in the database with this email address";
    }

    const userName =
      employeeName.trim().split(" ")[0] +
      "@" +
      Math.floor(Math.random() * 10000 + 1);

    const hash_password = await bcrypt.hash(password, 10);

    const _user = new User({
      contactNumber,
      designation,
      email,
      hash_password,
      gender,
      userName,
      employeeName,
      role: role ?? "user",
    });

    const savedUser = await _user.save();

    response.status(200).json({
      message: "User is signed up successfully",
      body: { User: savedUser },
    });
  } catch (error) {
    response.status(400).json({
      message: "Error while saving the user",
      error: JSON.stringify(error),
    });
  }
}

export async function getAllUser(request: any, response: Response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.page_per_page) || 10;

    const skip = (page - 1) * limit;

    const userList = await User.find({})
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    response.status(200).json({
      message: "List of available users",
      users: userList,
      currentPage: page,
      totalPages,
      totalUsers,
    });
  } catch (error) {
    response.status(400).json({
      message: error,
    });
  }
}

export async function getUserByID(request: Request, response: Response) {
  try {
    const _id = request.params._id.split(":")[1];
    console.log(_id);

    const uselList = await User.find({ _id });
    response.status(200).json({
      message: "user is available",
      users: uselList,
    });
  } catch (error) {
    response.status(400).json({
      message: "user is not available",
      error,
    });
  }
}
