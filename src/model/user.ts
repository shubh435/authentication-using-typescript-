import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
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

    salry: {
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

userSchema.methods = {
  authenticate: async function (password: string) {
    const bCryptedPassword = await bcrypt.compare(password, this.hash_password);
    console.log({ bCryptedPassword });
    return bCryptedPassword;
  },
};

module.exports = mongoose.model("user", userSchema);
