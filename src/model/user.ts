import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  employeeName: string;
  email: string;
  userName: string;
  designation: string;
  hash_password: string;
  contactNumber: string;
  gender: string;
  profilePicture?: string;
  salary?: string;
  adress?: string;
  role: "user" | "admin";
  authenticate: (password: string) => boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    employeeName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 30,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["male", "female", "transgender"],
    },

    designation: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      trim: true,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    contactNumber: {
      type: String,
      required: true,
    },

    profilePicture: {
      type: String,
    },

    salary: {
      type: String,
    },

    adress: {
      type: String,
      min: 3,
    },

    userName: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.authenticate = async function (password: string) {
  const bCryptedPassword = await bcrypt.compare(password, this.hash_password);
  return bCryptedPassword;
};

const User = mongoose.model("User", userSchema);

export default User;
