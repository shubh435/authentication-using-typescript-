import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../model/user";
const router = express.Router();

function signin(request: Request, response: Response) {
  response
    .status(200)
    .json({ message: "User is signed in successfully", body: request.body });
}

async function signup(request: Request, response: Response) {
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

router.post("/signin", signin);

router.post("/signup", signup);

export default router;
